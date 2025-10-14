import { MikroORM } from '@mikro-orm/core';
import { ormConfig } from '@src/db/ormconfig';
import { existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';

import { createFixtures } from './create-fixtures';

async function run() {
  console.log('🔄 Starting database reset and fixture creation...');

  try {
    // Drop existing database
    console.log('🗑️  Deleting database ...');
    const dbPath = resolve(__dirname, '../../../hotel-mcp.sqlite3');
    if (existsSync(dbPath)) {
      unlinkSync(dbPath);
      console.log('🗑️  Deleted hotel-mcp.sqlite3');
    }

    // Initialize MikroORM
    console.log('📊 Connecting to database...');
    const orm = await MikroORM.init(ormConfig);

    // Get the SchemaGenerator and EntityManager
    const em = orm.em.fork();

    // Run migrations
    console.log('🔄 Running migrations...');
    const migrator = orm.getMigrator();
    await migrator.up();

    // Create fixtures
    console.log('🌱 Creating fixtures...');
    await createFixtures(em);

    console.log('✅ Database reset and fixtures created successfully!');
  } catch (error) {
    console.error('❌ Error during database reset:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Execute the script
run();
