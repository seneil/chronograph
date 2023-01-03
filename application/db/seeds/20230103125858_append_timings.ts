import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('timings').insert([
    {
      id: 6,
      activity_id: 1,
      start_at: new Date('2022-12-26 10:00').toISOString(),
      end_at: new Date('2022-12-26 11:30').toISOString(),
      description: '',
      created_at: knex.fn.now(),
    },
    {
      id: 7,
      activity_id: 2,
      start_at: new Date('2022-12-26 13:00').toISOString(),
      end_at: new Date('2022-12-26 14:10').toISOString(),
      description: 'Обед',
      created_at: knex.fn.now(),
    },
    {
      id: 8,
      activity_id: 4,
      start_at: new Date('2022-12-26 14:10').toISOString(),
      end_at: new Date('2022-12-26 17:30').toISOString(),
      description: '',
      created_at: knex.fn.now(),
    },
  ]);
}
