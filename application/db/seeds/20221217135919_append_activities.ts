import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('activities').truncate();

  await knex('activities').insert([
    {
      id: 1,
      category_id: 1,
      name: 'CHRN-8016',
      description: 'Внедрить фильтрацию Е2Е тестов',
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
      name: 'CHRN-8522',
      description: 'В доку по API добавить методы добавления, удаления и просмотра списка подразделений',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 4,
      category_id: 3,
      name: 'Knex Migrations',
      description: '',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
