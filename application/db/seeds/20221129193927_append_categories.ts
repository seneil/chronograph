import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').truncate();

  await knex('categories').insert([
    {
      id: 1,
      name: 'Chronograph',
      description: 'Time tracker application',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      name: 'Досуг',
      description: '',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 3,
      name: 'Образование',
      description: 'Изучение новых материалов',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
