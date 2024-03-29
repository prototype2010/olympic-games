import sqlite3 from 'sqlite3';
import { DB_FILE_PATH } from '../../config';
import knex from 'knex';

export class DatabaseConnection {
  private static instance = knex({
    client: 'sqlite3',
    connection: {
      filename: DB_FILE_PATH,
    },
    useNullAsDefault: true,
    pool: { min: 100, max: 200 },
  });

  private constructor() {}

  static getInstance() {
    return DatabaseConnection.instance;
  }

  static destroy() {
    return DatabaseConnection.instance.destroy();
  }
}
