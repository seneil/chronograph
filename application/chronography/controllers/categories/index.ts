import { knex } from '@application/connection';

import { CategoryTable } from '@application/types';

export const getCategories = async () => (
  await knex<CategoryTable>('categories')
    .select('*')
);

export const searchCategory = async (name: string) => (
  await knex<CategoryTable>('categories')
    .select('*')
    .where({ name })
);

export const getCategory = async (id: number) => (
  await knex<CategoryTable>('categories')
    .select('*')
    .where({ id })
);

export const insertCategory = async (name: string) => {
  const [id] = await knex<CategoryTable>('categories')
    .insert({ name });

  const [category] = await getCategory(id);

  return category;
};
