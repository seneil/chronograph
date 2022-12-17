import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('activities', table => {
      table.increments('id');
      table.integer('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE');
      table.string('name', 255).notNullable();
      table.text('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable('activities');
}
