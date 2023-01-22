import { join } from 'path';
import { homedir } from 'os';
import { existsSync, mkdirSync } from 'fs';

import { knex } from '@application/connection';
import { WebpackMigrationSource } from '@application/db/webpack-migration-source';
import { WebpackSeedSource } from '@application/db/webpack-seed-source';

import { FOLDER_NAME } from '@constants';

const USER_DATA_FOLDER = join(homedir(), FOLDER_NAME);

export const bootstrap = async () => {
  const isUserDataFolderExists = existsSync(USER_DATA_FOLDER);

  if (!isUserDataFolderExists) mkdirSync(USER_DATA_FOLDER);

  await knex.migrate.latest({
    migrationSource: new WebpackMigrationSource(
      require.context('./db/migrations', false, /^\.\/.*\.ts$/)
    ),
  });

  await knex.seed.run({
    seedSource: new WebpackSeedSource(
      require.context('./db/seeds', false, /^\.\/.*\.ts$/)
    ),
  })
};
