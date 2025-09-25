# Database Migrations System

## Overview
This migration system helps you manage database schema changes for your Cloudflare D1 contact form database in a structured, version-controlled way.

## Migration Files Structure

```
database/
├── migrations/
│   ├── 001_create_contacts_table.sql
│   ├── 002_add_contact_status.sql
│   └── ...
├── migrate.js
└── schema.sql (legacy - use migrations instead)
```

## Available Commands

### Check Migration Status
```bash
npm run migrate:status
```
Shows all available migrations and their descriptions.

### Get Help
```bash
npm run migrate:help
```
Displays detailed usage information.

### Generate Migration Commands
```bash
# Generate commands for local development
npm run migrate:local

# Generate commands for production
npm run migrate:prod
```

### View Specific Migration
```bash
npm run migrate 001_create_contacts_table
```

## Migration Workflow

### 1. Check Current Status
```bash
npm run migrate:status
```

### 2. Run Migrations Locally (Development)
```bash
npm run migrate:local
```
This will display the wrangler commands to run. Copy and execute them:

```bash
npx wrangler d1 execute contact-us-personal-site --local --file="./database/migrations/001_create_contacts_table.sql"
npx wrangler d1 execute contact-us-personal-site --local --file="./database/migrations/002_add_contact_status.sql"
```

### 3. Test Your Application
Test the contact form to ensure everything works with the new schema.

### 4. Run Migrations in Production
```bash
npm run migrate:prod
```
Copy and execute the displayed commands:

```bash
npx wrangler d1 execute contact-us-personal-site --remote --file="./database/migrations/001_create_contacts_table.sql"
npx wrangler d1 execute contact-us-personal-site --remote --file="./database/migrations/002_add_contact_status.sql"
```

## Current Migrations

### 001_create_contacts_table.sql
- Creates the initial `contacts` table
- Creates performance indexes
- Sets up the migration tracking system

### 002_add_contact_status.sql
- Adds `status` column (new, read, replied, archived)
- Adds `priority` column (low, medium, high, urgent) 
- Adds `subject` column for better organization
- Creates status index for filtering

## Creating New Migrations

### 1. Create Migration File
Create a new file in `database/migrations/` with format:
```
003_your_migration_name.sql
```

### 2. Migration Template
```sql
-- Migration: 003_your_migration_name
-- Created: YYYY-MM-DD
-- Description: Brief description of what this migration does

-- Your SQL commands here
ALTER TABLE contacts ADD COLUMN new_field TEXT;

-- Record this migration as applied
INSERT OR IGNORE INTO migrations (migration_name) VALUES ('003_your_migration_name');
```

### 3. Test Locally First
Always run new migrations in local development before production.

## Database Queries

### View All Contacts
```bash
npm run db:local-query "SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10"
```

### Check Migration Status
```bash
npm run db:local-query "SELECT * FROM migrations ORDER BY applied_at"
```

### Count Contacts by Status
```bash
npm run db:local-query "SELECT status, COUNT(*) as count FROM contacts GROUP BY status"
```

## Best Practices

1. **Always run locally first** - Test migrations in development
2. **One change per migration** - Keep migrations focused and small
3. **Never modify existing migrations** - Create new ones instead
4. **Add descriptive comments** - Include purpose and date
5. **Backup before production** - Export data before major changes

## Troubleshooting

### Migration Already Applied
If you see "UNIQUE constraint failed: migrations.migration_name", the migration was already applied. Check with:
```bash
npm run db:local-query "SELECT * FROM migrations"
```

### Rolling Back
Currently, rollbacks must be done manually. Create a new migration that reverses the changes:
```sql
-- Migration: 003_rollback_previous_change
-- Reverts changes from migration 002
ALTER TABLE contacts DROP COLUMN status;
```

### Schema Conflicts
If you encounter schema conflicts, you may need to:
1. Export existing data
2. Drop and recreate tables
3. Import data back

## Integration with Contact Form

The contact form automatically works with the current schema. After running migrations:

1. **Status field** - New contacts default to 'new' status
2. **Priority field** - Defaults to 'medium' priority  
3. **Subject field** - Can be added to the form later

The form will continue working even if you don't update it immediately after adding new fields.