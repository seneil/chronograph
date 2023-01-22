import { Knex } from 'knex';

async function insertActivities(knex: Knex) {
  await knex('activities')
    .truncate()
    .insert([
      {
        id: 1,
        category_id: 1,
        name: 'Написание тестов',
        description: 'Разработать тесты окна хронографии',
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        id: 2,
        category_id: 2,
        name: 'Обед',
        description: '',
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        id: 3,
        category_id: 1,
        name: 'Разработка API',
        description: 'В документацию по API добавить методы добавления, удаления и просмотра списка таймингов',
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        id: 4,
        category_id: 3,
        name: 'Изучение Knex Migrations',
        description: '',
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
    ]);
}

export async function seed(knex: Knex): Promise<void> {
  const [count] = await knex('activities').count('id as activities');

  if (count.activities === 0) await insertActivities(knex);
}
