import { defineConfig } from '@mikro-orm/sqlite';

export const ormConfig = defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'hotel-mcp.sqlite3',
  debug: false,
  migrations: {
    tableName: 'Migrations',
    //  `path` is only used to tell MikroORM where to place newly generated migrations. Available migrations are defined using `migrationsList`.
    path: './src/db/migrations',
    pathTs: './src/db/migrations',
  },
});
