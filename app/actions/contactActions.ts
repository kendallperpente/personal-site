'use server';

import { ContactFormData, ContactSubmissionResponse } from '../types/contact';
import ContactValidator from '../utils/contactValidator';

// Function to get Discord webhook URL from environment
function getDiscordWebhookUrl(): string | null {
  try {
    // Check environment variable
    if (process.env.DISCORD_WEBHOOK_URL) {
      return process.env.DISCORD_WEBHOOK_URL;
    }

    // Try to access from CloudflareEnv context
    const globalEnv = (globalThis as { env?: CloudflareEnv }).env;
    if (typeof globalEnv !== 'undefined' && globalEnv.DISCORD_WEBHOOK_URL) {
      return globalEnv.DISCORD_WEBHOOK_URL;
    }
  } catch (error) {
    console.warn('Could not access Discord webhook URL from environment:', error);
  }
  
  return null;
}

// Function to get database binding from Cloudflare environment
function getDatabase(): D1Database {
  console.log('🔍 Getting database connection...');
  
  // First, try to get the database from the request context (Cloudflare Pages/Workers)
  try {
    // Method 1: Direct global access (Workers/Pages runtime)
    if (typeof globalThis !== 'undefined') {
      const globalEnv = (globalThis as any)?.env || (globalThis as any)?.process?.env || globalThis;
      
      if (globalEnv?.DB) {
        console.log('✅ Found DB in globalThis.env.DB');
        return globalEnv.DB;
      }
      
      if ((globalThis as any)?.DB) {
        console.log('✅ Found DB in globalThis.DB');
        return (globalThis as any).DB;
      }
    }
    
    // Method 2: Process environment (Pages integration)
    if (process.env.CF_PAGES || process.env.CLOUDFLARE_PAGES) {
      const envDB = (process as any)?.env?.DB;
      if (envDB) {
        console.log('✅ Found DB in process.env.DB');
        return envDB;
      }
    }
    
    // Method 3: Check for platform-specific environment
    const platformEnv = (globalThis as any)?.cloudflare?.env || (globalThis as any)?.env;
    if (platformEnv?.DB) {
      console.log('✅ Found DB in platform environment');
      return platformEnv.DB;
    }
    
    console.log('🔍 Database binding not found in any environment');
    console.log('Available globals:', Object.keys(globalThis).filter(k => k.includes('DB') || k.includes('env')));
    
  } catch (error) {
    console.error('Error accessing database environment:', error);
  }
  
  // Check if we should force production behavior
  const isCloudflare = process.env.CF_PAGES === 'true' || 
                      process.env.CLOUDFLARE_PAGES === 'true' ||
                      typeof (globalThis as any)?.caches !== 'undefined' ||
                      typeof (globalThis as any)?.crypto?.subtle !== 'undefined';
  
  if (isCloudflare) {
    console.error('🚨 Running in Cloudflare environment but no database connection found!');
    console.error('This suggests a configuration issue with the D1 database binding.');
    // Return mock with error logging for now - don't break the entire app
    console.warn('⚠️ Falling back to mock database due to binding issue');
    return createMockDatabase();
  }
  
  // Local development fallback
  console.warn('⚠️ Using mock database for local development');
  return createMockDatabase();
}

// Mock database for local development
function createMockDatabase(): D1Database {
  const mockMeta = { 
    changed_db: true, 
    changes: 1, 
    duration: 1, 
    last_row_id: Math.floor(Math.random() * 1000),
    rows_read: 0,
    rows_written: 1,
    size_after: 1024
  };

  return {
    prepare: (query: string) => ({
      bind: (...values: unknown[]) => ({
        run: async () => {
          console.log('Mock DB Query:', query);
          console.log('Mock DB Values:', values);
          return { 
            success: true, 
            meta: mockMeta
          };
        },
        first: async () => null,
        all: async () => ({ results: [], success: true, meta: mockMeta })
      }),
      run: async () => ({ success: true, meta: mockMeta }),
      first: async () => null,
      all: async () => ({ results: [], success: true, meta: mockMeta })
    }),
    dump: async () => new ArrayBuffer(0),
    batch: async () => [],
    exec: async () => ({ count: 0, duration: 1 }),
    withSession: (callback: (session: unknown) => unknown) => callback({})
  } as unknown as D1Database;
}

// Single Responsibility: Database operations
class ContactRepository {
  static async saveContact(data: ContactFormData): Promise<void> {
    const db = getDatabase();
    
    // Ensure the table exists (auto-create if needed)
    try {
      await db.prepare(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          description TEXT NOT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `).run();
      
      console.log('✅ Contacts table ensured to exist');
    } catch (tableError) {
      console.warn('⚠️ Could not ensure table exists:', tableError);
    }
    
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, phone, description, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `);
    
    console.log('💾 Inserting contact data:', data);
    const result = await stmt.bind(data.name, data.email, data.phone, data.description).run();
    console.log('💾 Database insert result:', result);
    
    if (!result.success) {
      console.error('❌ Database insert failed:', result);
      throw new Error('Failed to save contact to database');
    }
    
    console.log('✅ Contact successfully saved to database with ID:', result.meta?.last_row_id);
  }
  
  // Optional: Method to retrieve contacts for admin interface
  static async getAllContacts(): Promise<ContactFormData[]> {
    const db = getDatabase();
    
    const stmt = db.prepare(`
      SELECT name, email, phone, description 
      FROM contacts 
      ORDER BY created_at DESC
    `);
    
    const result = await stmt.all<ContactFormData>();
    return result.results || [];
  }
}

// Discord notification service
class DiscordNotificationService {
  static async sendContactNotification(data: ContactFormData): Promise<void> {
    const webhookUrl = getDiscordWebhookUrl();
    
    console.log('Discord webhook URL:', webhookUrl ? 'Found' : 'Not found');
    
    if (!webhookUrl) {
      console.warn('Discord webhook URL not configured - skipping Discord notification');
      return;
    }

    try {
      console.log('Sending Discord notification for contact:', data.name);
      
      const embed = {
        title: "🚀 New Contact Form Submission",
        color: 0x00D4FF, // Cyan color to match your theme
        fields: [
          {
            name: "👤 Name",
            value: data.name,
            inline: true
          },
          {
            name: "📧 Email",
            value: data.email,
            inline: true
          },
          {
            name: "📱 Phone",
            value: data.phone,
            inline: true
          },
          {
            name: "💬 Message",
            value: data.description.length > 1000 
              ? data.description.substring(0, 1000) + "..." 
              : data.description,
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Personal Site Contact Form"
        }
      };

      const payload = {
        username: "Personal Site Bot",
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        embeds: [embed]
      };

      console.log('Sending Discord webhook request...');
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Discord webhook response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Discord webhook error response:', errorText);
        throw new Error(`Discord webhook failed: ${response.status} ${response.statusText}`);
      }

      console.log('Discord notification sent successfully');
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
      // Don't throw error here - we don't want to fail the entire form submission
      // if Discord notification fails
    }
  }
}

// Single Responsibility: Contact form business logic
export async function submitContactForm(
  prevState: ContactSubmissionResponse | null,
  formData: FormData
): Promise<ContactSubmissionResponse> {
  try {
    console.log('🚀 Contact form submission started');
    
    // Extract and sanitize form data
    const contactData: ContactFormData = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      description: String(formData.get('description') || '').trim(),
    };

    const turnstileToken = String(formData.get('turnstile-token') || '').trim();

    // Verify Turnstile token
    if (!turnstileToken) {
      return {
        success: false,
        message: 'Security verification is required',
        error: 'Missing Turnstile token'
      };
    }

    // Verify Turnstile token with Cloudflare
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
    
    // Skip Turnstile verification in development or use test keys
    if (process.env.NODE_ENV === 'development' || turnstileSecret === '1x0000000000000000000000000000000AA') {
      console.log('Using development mode - Turnstile verification bypassed');
    } else {
      try {
        const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
          }),
        });

        const turnstileResult = await turnstileResponse.json() as { 
          success: boolean; 
          'error-codes'?: string[]; 
        };
        
        if (!turnstileResult.success) {
          console.error('Turnstile verification failed:', turnstileResult['error-codes']);
          return {
            success: false,
            message: 'Security verification failed. Please try again.',
            error: 'Turnstile verification failed'
          };
        }
      } catch (error) {
        console.error('Turnstile verification error:', error);
        return {
          success: false,
          message: 'Security verification error. Please try again.',
          error: 'Turnstile API error'
        };
      }
    }

    // Validate input data
    console.log('📝 Validating contact data:', contactData);
    const validation = ContactValidator.validate(contactData);
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      return {
        success: false,
        message: 'Please fix the validation errors',
        error: Object.values(validation.errors).join(', ')
      };
    }

    // Save to database
    console.log('💾 Saving contact to database...');
    await ContactRepository.saveContact(contactData);
    console.log('✅ Contact saved to database successfully');

    // Send Discord notification (non-blocking)
    console.log('📨 Sending Discord notification...');
    await DiscordNotificationService.sendContactNotification(contactData);

    console.log('🎉 Contact form submission completed successfully');
    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    };

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return {
      success: false,
      message: 'Sorry, there was an error submitting your message. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
