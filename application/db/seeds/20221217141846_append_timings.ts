import { Knex } from 'knex';

async function insertTimings(knex: Knex) {
  await knex('timings')
    .truncate()
    .insert([
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

export async function seed(knex: Knex): Promise<void> {
  const [count] = await knex('timings').count('id as timings');

  if (count.timings === 0) await insertTimings(knex);
}
