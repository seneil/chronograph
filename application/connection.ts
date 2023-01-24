import { app } from 'electron';
import knexSqlite3 from 'knex';

import knexConfig from '@application/knexfile';

import { ENVIRONMENT } from '@constants';

const environmentKey = app.isPackaged
  ? ENVIRONMENT.PRODUCTION
  : ENVIRONMENT.DEVELOPMENT;

export const knex = knexSqlite3(knexConfig[environmentKey]);
