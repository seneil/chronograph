import { Knex } from 'knex';

import { parseTimeString } from '../../chronography/utils/parse-time-string';

export async function seed(knex: Knex): Promise<void> {
  await knex('timings').truncate()

  await knex('timings').insert([
    {
      id: 1,
      activity_id: 1,
      start_at: parseTimeString('10:00'),
      end_at: parseTimeString('12:30'),
      description: '',
      created_at: knex.fn.now(),
    },
    {
      id: 2,
      activity_id: 2,
      start_at: parseTimeString('12:30'),
      end_at: parseTimeString('13:30'),
      description: 'Обед',
      created_at: knex.fn.now(),
    },
    {
      id: 3,
      activity_id: 3,
      start_at: parseTimeString('13:30'),
      end_at: parseTimeString('15:00'),
      description: '',
      created_at: knex.fn.now(),
    },
    {
      id: 4,
      activity_id: 1,
      start_at: parseTimeString('15:00'),
      end_at: parseTimeString('16:00'),
      description: '',
      created_at: knex.fn.now(),
    },
    {
      id: 5,
      activity_id: 4,
      start_at: parseTimeString('16:00'),
      end_at: parseTimeString('18:00'),
      description: '',
      created_at: knex.fn.now(),
    },
  ]);
}
