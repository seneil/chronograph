import knexSqlite3 from 'knex';

import knexConfig from '@application/knexfile';

export const knex = knexSqlite3(knexConfig[process.env.NODE_ENV || 'development']);