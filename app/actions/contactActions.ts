'use server';

import { ContactFormData, ContactSubmissionResponse } from '../types/contact';
import ContactValidator from '../utils/contactValidator';

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
