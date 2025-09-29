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
  
  // For Cloudflare Pages, the database binding should be available via the request context
  // But since we're in a server action, we need to access it differently
  
  try {
    // Method 1: Check if running in Cloudflare Pages environment
    if (typeof globalThis !== 'undefined') {
      // Try accessing the database from various possible locations
      const possibleDBs = [
        (globalThis as any)?.process?.env?.DB,
        (globalThis as any)?.cloudflare?.env?.DB,
        (globalThis as any)?.env?.DB,
        (globalThis as any)?.DB,
        (process as any)?.env?.DB,
      ];
      
      for (let i = 0; i < possibleDBs.length; i++) {
        const db = possibleDBs[i];
        if (db && typeof db === 'object' && db.prepare) {
          console.log(`✅ Found working D1 database at location ${i + 1}`);
          return db;
        }
      }
    }
    
    console.log('🔍 No direct database binding found, checking environment...');
    
  } catch (error) {
    console.error('Error accessing database environment:', error);
  }
  
  // If we're in Cloudflare but can't find the database, this is a configuration issue
  const isCloudflare = typeof (globalThis as any)?.caches !== 'undefined' ||
                      typeof (globalThis as any)?.crypto?.subtle !== 'undefined' ||
                      process.env.CF_PAGES === 'true';
  
  if (isCloudflare) {
    console.error('🚨 Running in Cloudflare environment but no D1 database binding found!');
    console.error('This means the D1 database is not properly bound to this Pages project.');
    console.error('Please configure the D1 binding in Cloudflare Pages dashboard.');
    
    // Create a failing database that will show clear errors
    return {
      prepare: (sql: string) => ({
        bind: (...params: any[]) => ({
          run: async () => {
            console.error('❌ DATABASE NOT CONFIGURED: D1 binding missing in Cloudflare Pages');
            console.error('The contact form data cannot be saved because the database is not connected.');
            console.error('Please add the D1 database binding in your Cloudflare Pages project settings.');
            return { 
              success: false, 
              error: 'Database not configured in Cloudflare Pages',
              meta: {} 
            };
          }
        })
      })
    } as any;
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
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || '0x4AAAAAAB3-OwPYjYL7hK3U8d26XvhdF8w';
    
    // Skip Turnstile verification only in local development
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.log('Using local development mode - Turnstile verification bypassed');
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
