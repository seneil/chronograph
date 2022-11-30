import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').del()
  await knex('categories').insert([
    { id: 1, name: 'CHRN-8016', description: 'Внедрить фильтрацию Е2Е тестов' },
    { id: 2, name: 'Обед', description: '' },
    { id: 3, name: 'CHRN-8522', description: 'В доку по API добавить методы добавления, удаления и просмотра списка подразделений' }
  ]);
}
