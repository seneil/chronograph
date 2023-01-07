import { knex } from '@application/connection';
import { CategoryTable } from '@application/types';

export const getCategories = async () => (
  await knex<CategoryTable>('categories')
    .select('*')
);
