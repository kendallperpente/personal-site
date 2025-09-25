#!/usr/bin/env node

/**
 * Database Migration Runner for Cloudflare D1
 * 
 * Usage:
 * - Run all pending migrations: node migrate.js
 * - Run specific migration: node migrate.js 001_create_contacts_table
 * - Rollback last migration: node migrate.js --rollback
 * - Check migration status: node migrate.js --status
 */

const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');

class MigrationRunner {
  constructor() {
    this.migrationsDir = join(__dirname, 'migrations');
  }

  /**
   * Get all migration files sorted by name
   */
  getAllMigrations() {
    try {
      return readdirSync(this.migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort();
    } catch (error) {
      console.error('Error reading migrations directory:', error.message);
      return [];
    }
  }

  /**
   * Read migration file content
   */
  readMigrationFile(filename) {
    try {
      const filePath = join(this.migrationsDir, filename);
      return readFileSync(filePath, 'utf8');
    } catch (error) {
      console.error(`Error reading migration file ${filename}:`, error.message);
      return null;
    }
  }

  /**
   * Generate wrangler command for executing migration
   */
  generateWranglerCommand(migrationName, isLocal = true) {
    const localFlag = isLocal ? '--local' : '--remote';
    const migrationFile = join(this.migrationsDir, migrationName);
    
    return `npx wrangler d1 execute contact-us-personal-site ${localFlag} --file="${migrationFile}"`;
  }

  /**
   * Display migration status
   */
  displayStatus() {
    const migrations = this.getAllMigrations();
    
    console.log('\n📊 Migration Status:');
    console.log('==================');
    
    if (migrations.length === 0) {
      console.log('No migrations found.');
      return;
    }

    migrations.forEach(migration => {
      const content = this.readMigrationFile(migration);
      if (!content) return;
      
      const lines = content.split('\n');
      const description = lines.find(line => line.includes('-- Description:'))
        ?.replace('-- Description:', '').trim() || 'No description';
      
      console.log(`📄 ${migration}`);
      console.log(`   ${description}`);
    });

    console.log('\n📋 To run migrations:');
    console.log('===================');
    console.log('Local development:');
    console.log('  npm run migrate:local');
    console.log('\nProduction:');
    console.log('  npm run migrate:prod');
  }

  /**
   * Display help information
   */
  displayHelp() {
    console.log(`
🗄️  Database Migration Runner
============================

Usage:
  node migrate.js [options] [migration-name]

Options:
  --status      Show all available migrations
  --help        Show this help message

Examples:
  node migrate.js --status                    # Show migration status
  node migrate.js 001_create_contacts_table   # Show specific migration

Migration Commands:
  npm run migrate:local     # Run all migrations locally
  npm run migrate:prod      # Run all migrations in production
  npm run db:local-query    # Query local database
  npm run db:query          # Query production database

Migration Files Location:
  ./database/migrations/

Note: This script generates the commands to run. Execute the displayed 
wrangler commands to actually apply the migrations.
`);
  }

  /**
   * Display specific migration details
   */
  displayMigration(migrationName) {
    const content = this.readMigrationFile(migrationName);
    if (!content) {
      console.error(`❌ Migration file not found: ${migrationName}`);
      return;
    }

    console.log(`\n📄 Migration: ${migrationName}`);
    console.log('='.repeat(50));
    console.log(content);
    console.log('='.repeat(50));

    console.log('\n🚀 To apply this migration:');
    console.log('Local:', this.generateWranglerCommand(migrationName, true));
    console.log('Prod: ', this.generateWranglerCommand(migrationName, false));
  }

  /**
   * Generate run commands for all pending migrations
   */
  generateRunCommands(isLocal = true) {
    const migrations = this.getAllMigrations();
    const env = isLocal ? 'local' : 'production';
    
    console.log(`\n🗄️  Running migrations in ${env}:`);
    console.log('='.repeat(40));

    if (migrations.length === 0) {
      console.log('No migrations to run.');
      return;
    }

    migrations.forEach(migration => {
      console.log(`\n📄 ${migration}:`);
      console.log(this.generateWranglerCommand(migration, isLocal));
    });

    console.log(`\n✅ Copy and run the above commands to apply migrations to ${env}.`);
  }

  /**
   * Main runner method
   */
  run() {
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args.includes('--help')) {
      this.displayHelp();
      return;
    }

    if (args.includes('--status')) {
      this.displayStatus();
      return;
    }

    if (args.includes('--local')) {
      this.generateRunCommands(true);
      return;
    }

    if (args.includes('--prod')) {
      this.generateRunCommands(false);
      return;
    }

    // Show specific migration
    const migrationName = args[0];
    if (migrationName) {
      this.displayMigration(migrationName);
      return;
    }

    this.displayHelp();
  }
}

// Run if called directly
if (require.main === module) {
  const runner = new MigrationRunner();
  runner.run();
}

module.exports = MigrationRunner;