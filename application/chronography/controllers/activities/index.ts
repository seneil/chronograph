import { knex } from '@application/connection';

import { ActivityTable } from '@application/types';

export const getActivities = async () => (
  await knex<ActivityTable>('activities')
    .select('*')
);

export const searchActivity = async (name: string, categoryId: number) => (
  await knex<ActivityTable>('activities')
    .select('*')
    .where({ name, category_id: categoryId })
);

export const getActivity = async (id: number, categoryId: number) => (
  await knex<ActivityTable>('activities')
    .select('*')
    .where({ id, category_id: categoryId })
);

export const insertActivity = async (name: string, categoryId: number) => {
  const [id] = await knex<ActivityTable>('activities')
    .insert({ name, category_id: categoryId });

  const [activity] = await getActivity(id, categoryId);

  return activity;
};
