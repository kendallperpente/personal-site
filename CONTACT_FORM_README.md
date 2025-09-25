# Contact Form with Cloudflare D1 Integration

## Overview
This contact form implementation follows SOLID principles and integrates with Cloudflare D1 database for persistent storage.

## Architecture

### Components
- **ContactForm.tsx**: React component with client-side validation and form submission
- **contactActions.ts**: Server actions for handling form submission and database operations
- **ContactValidator.ts**: Validation logic following Single Responsibility Principle
- **contact.ts**: TypeScript interfaces for type safety

### Design Principles Applied

#### KISS (Keep It Simple, Stupid)
- Simple form with 4 fields: name, email, phone, description
- Clear validation messages
- Straightforward database schema

#### DRY (Don't Repeat Yourself)
- Reusable FormField configuration
- Centralized validation logic
- Shared TypeScript interfaces

#### SOLID Principles
- **Single Responsibility**: Each class/function has one clear purpose
- **Open/Closed**: Easy to extend with new validation rules
- **Liskov Substitution**: Components can be replaced without breaking functionality
- **Interface Segregation**: Clean, focused interfaces
- **Dependency Inversion**: Database operations abstracted through repository pattern

## Database Setup

### 1. Initialize the Database Schema
```bash
# For production database
npm run db:init

# For local development database
npm run db:local-init
```

### 2. Verify Database Setup
```bash
# Check if table was created
npx wrangler d1 execute contact-us-personal-site --command="SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'"
```

### 3. Query Contacts (Optional)
```bash
# View all contacts
npx wrangler d1 execute contact-us-personal-site --command="SELECT * FROM contacts ORDER BY created_at DESC"

# Count total contacts
npx wrangler d1 execute contact-us-personal-site --command="SELECT COUNT(*) as total FROM contacts"
```

## Development

### Local Development
The form includes a mock database for local development that logs queries to the console. This allows you to test the form without requiring a live D1 connection.

### Environment Detection
- **Production**: Uses Cloudflare D1 through OpenNext context
- **Development**: Uses mock database with console logging

## Database Schema

```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Validation Rules

### Name
- Required
- Minimum 2 characters
- Maximum 100 characters

### Email
- Required
- Valid email format
- Maximum 254 characters

### Phone
- Required
- Valid phone format (international supported)
- Maximum 20 characters

### Description
- Required
- Minimum 10 characters
- Maximum 1000 characters

## Security Features

- Server-side validation
- SQL injection prevention through prepared statements
- Input sanitization
- Rate limiting (can be added via Cloudflare Workers)

## Error Handling

- Client-side validation for immediate feedback
- Server-side validation for security
- Graceful error messages for users
- Detailed error logging for developers

## Deployment

The contact form is automatically deployed with your Next.js application using OpenNext. Ensure your `wrangler.toml` includes the D1 database binding:

```toml
[[d1_databases]]
binding = "DB"
database_name = "contact-us-personal-site"
database_id = "your-database-id"
```

## Future Enhancements

- Email notifications when new contacts are submitted
- Admin dashboard to view/manage contacts
- Spam protection with Cloudflare Turnstile
- Contact export functionality
- Analytics and reporting
