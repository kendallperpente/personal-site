-- Database initialization script for Cloudflare D1
-- Run this with: npx wrangler d1 execute contact-us-personal-site --command="CREATE TABLE IF NOT EXISTS contacts..."

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster querying by creation date
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Index for faster querying by email (for duplicate checking if needed)
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Example query to verify table structure
-- SELECT name FROM sqlite_master WHERE type='table' AND name='contacts';
