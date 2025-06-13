import migrationRunner from 'node-pg-migrate';
import { resolve } from 'node:path';
import database from 'infra/database';
import { MigrationDirection } from 'node-pg-migrate/dist/types';
import { MethodNotAllowed, InternalServerError } from 'infra/error';

async function get(request, response) {
  if (request.method !== 'GET') {
    const objectError = new MethodNotAllowed();
    return response.status(objectError.statusCode).json(objectError.toJSON());
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

    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    return response.status(200).json(pendingMigrations);
  } catch (error) {
    const objectError = new InternalServerError({ cause: error, statusCode: error.statusCode });
    return response.status(objectError.statusCode).json(objectError.toJSON());
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}

async function post(request, response) {
  if (request.method !== 'POST') {
    const objectError = new MethodNotAllowed();
    return response.status(objectError.statusCode).json(objectError.toJSON());
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: false,
      dir: resolve('infra', 'migrations'),
      verbose: true,
      migrationsTable: 'pgmigrations',
      direction: 'up' as MigrationDirection,
    };

    const migratedMigrations = await migrationRunner(defaultMigrationOptions);

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } catch (error) {
    const objectError = new InternalServerError({ cause: error, statusCode: error.statusCode });
    return response.status(objectError.statusCode).json(objectError.toJSON());
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}

export default { get, post };
