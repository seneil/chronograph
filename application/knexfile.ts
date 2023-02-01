import { homedir } from 'os';
import { join } from 'path';

import type { Knex } from 'knex';

import { ENVIRONMENT, FOLDER_NAME } from '../constants';

const USER_DATA_PATH = join(homedir(), FOLDER_NAME);

const config: { [key: string]: Knex.Config } = {
  [ENVIRONMENT.DEVELOPMENT]: {
    client: 'better-sqlite3',
    debug: false,
    connection: {
      filename: join(USER_DATA_PATH, `chronography-development.sqlite3`),
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
      filename: join(USER_DATA_PATH, `chronography.sqlite3`),
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
