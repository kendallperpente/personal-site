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
  // In production (Cloudflare Workers), try to access from runtime context
  try {
    // Check if we're in a Cloudflare Workers environment
    if (typeof globalThis !== 'undefined' && (globalThis as Record<string, unknown>).DB) {
      return (globalThis as Record<string, unknown>).DB as D1Database;
    }
    
    // Try to access from process.env if available (OpenNext context)
    if (process.env.CF_PAGES && (process.env as Record<string, unknown>).DB) {
      return (process.env as Record<string, unknown>).DB as D1Database;
    }

    // Try to access from CloudflareEnv context
    const globalEnv = (globalThis as { env?: CloudflareEnv }).env;
    if (typeof globalEnv !== 'undefined' && globalEnv.DB) {
      return globalEnv.DB;
    }
  } catch (error) {
    console.warn('Could not access Cloudflare context:', error);
  }
  
  // Development fallback - mock database for local testing
  if (process.env.NODE_ENV === 'development' || !process.env.CF_PAGES) {
    console.warn('Using mock database for development. Database operations will be logged only.');
    return createMockDatabase();
  }
  
  throw new Error('Database not available. Please ensure D1 binding is configured in wrangler.toml');
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
    
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, phone, description, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `);
    
    const result = await stmt.bind(data.name, data.email, data.phone, data.description).run();
    
    if (!result.success) {
      throw new Error('Failed to save contact to database');
    }
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
    
    if (!webhookUrl) {
      console.warn('Discord webhook URL not configured');
      return;
    }

    try {
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

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
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
    const validation = ContactValidator.validate(contactData);
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Please fix the validation errors',
        error: Object.values(validation.errors).join(', ')
      };
    }

    // Save to database
    await ContactRepository.saveContact(contactData);

    // Send Discord notification (non-blocking)
    await DiscordNotificationService.sendContactNotification(contactData);

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
