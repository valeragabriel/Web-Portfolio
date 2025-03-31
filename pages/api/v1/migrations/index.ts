import migrationRunner from 'node-pg-migrate';
import { resolve } from 'node:path';
import database from 'infra/database';
import { MigrationDirection } from 'node-pg-migrate/dist/types';

async function migrations(request, response) {
  if (!(request.method === 'GET' || request.method === 'POST')) {
    return response.status('405').json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve('infra', 'migrations'),
      verbose: true,
      migrationsTable: 'pgmigrations',
      direction: 'up' as MigrationDirection,
    };

    if (request.method === 'GET') {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === 'POST') {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await dbClient.end();
  }
}

export default migrations;
