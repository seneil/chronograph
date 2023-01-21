import { homedir } from 'os';
import { join } from 'path';

import type { Knex } from 'knex';

import { ENVIRONMENT } from '../constants';

const USER_DATA_FOLDER = join(homedir(), '.chronography');

const config: { [key: string]: Knex.Config } = {
  [ENVIRONMENT.DEVELOPMENT]: {
    client: 'better-sqlite3',
    debug: true,
    connection: {
      filename: join(USER_DATA_FOLDER, `chronography-development.sqlite3`),
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'chronography_migrations',
    },
    seeds: {
      directory: './db/seeds',
      timestampFilenamePrefix: true,
    },
    useNullAsDefault: true,
  },
  [ENVIRONMENT.PRODUCTION]: {
    client: 'better-sqlite3',
    connection: {
      filename: join(USER_DATA_FOLDER, `chronography.sqlite3`),
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'chronography_migrations',
    },
    seeds: {
      directory: './db/seeds',
      timestampFilenamePrefix: true,
    },
    useNullAsDefault: true,
  },
};

export default config;
