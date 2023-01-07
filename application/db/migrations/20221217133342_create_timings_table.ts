import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('timings', table => {
      table.increments('id');
      table.integer('activity_id')
        .references('id')
        .inTable('activities')
        .onDelete('CASCADE');
      table.datetime('start_at').notNullable();
      table.datetime('end_at');
      table.text('description');
      table.datetime('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable('timings');
}
