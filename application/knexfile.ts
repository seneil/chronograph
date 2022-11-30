import { homedir } from 'os';
import { join } from 'path';

import type { Knex } from 'knex';

import { USER_DATA_FOLDER } from './constants';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    debug: true,
    connection: {
      filename: join(homedir(), USER_DATA_FOLDER, `chronography-development.sqlite3`),
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

module.exports = config;
