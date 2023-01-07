import { knex } from '@application/connection';

import { ActivityView } from '@application/types';

export const fetchChronography = async () => (
  await knex<ActivityView[]>('timings')
    .select([
      'timings.id as timing_id',
      'categories.id as category_id',
      'categories.name as category_name',
      'activities.id as activity_id',
      'activities.name as activity_name',
      'timings.start_at as start_at',
      'timings.end_at as end_at',
      'timings.description as description',
    ])
    .join('activities', { 'timings.activity_id': 'activities.id' })
    .join('categories', { 'activities.category_id': 'categories.id' })
    .orderBy([
      { column: 'timings.start_at', order: 'asc' },
    ])
);
