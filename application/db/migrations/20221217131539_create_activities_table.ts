import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('activities', (table: Knex.TableBuilder) => {
      table.increments('id');
      table.integer('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE');
      table.string('name', 255).notNullable();
      table.text('description');
      table.datetime('created_at').defaultTo(knex.fn.now());
      table.datetime('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable('activities');
}
