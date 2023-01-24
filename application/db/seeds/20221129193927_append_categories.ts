import { Knex } from 'knex';

async function insertCategories(knex: Knex) {
  await knex('categories')
    .truncate()
    .insert([
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

export async function seed(knex: Knex): Promise<void> {
  const [count] = await knex('categories').count('id as categories');

  if (count.categories === 0) await insertCategories(knex);
}
