import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('timings').truncate()

  await knex('timings').insert([
    {
      id: 1,
      activity_id: 1,
      start_at: new Date('2022-12-25 10:00').toISOString(),
      end_at: new Date('2022-12-25 12:30').toISOString(),
      description: '',
      created_at: knex.fn.now(),
    },
    {
      id: 2,
      activity_id: 2,
      start_at: new Date('2022-12-25 12:30').toISOString(),
      end_at: new Date('2022-12-25 13:30').toISOString(),
      description: 'Обед',
      created_at: knex.fn.now(),
    },
    {
      id: 3,
      activity_id: 3,
      start_at: new Date('2022-12-25 13:30').toISOString(),
      end_at: new Date('2022-12-25 15:00').toISOString(),
      description: '',
      created_at: knex.fn.now(),
    },
    {
      id: 4,
      activity_id: 1,
      start_at: new Date('2022-12-25 15:00').toISOString(),
      end_at: new Date('2022-12-25 16:00').toISOString(),
      description: '',
      created_at: knex.fn.now(),
    },
    {
      id: 5,
      activity_id: 4,
      start_at: new Date('2022-12-25 16:00').toISOString(),
      end_at: new Date('2022-12-25 18:00').toISOString(),
      description: '',
      created_at: knex.fn.now(),
    },
  ]);
}
