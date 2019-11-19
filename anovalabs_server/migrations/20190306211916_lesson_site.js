exports.up = knex =>
  knex.schema.createTable('lesson_site', table => {
    table.increments();
    table
      .integer('lesson_id')
      .notNullable()
      .unsigned();
    table
      .integer('site_id')
      .notNullable()
      .unsigned();
    table.timestamp('date').defaultTo(knex.fn.now());
    table
      .foreign('lesson_id')
      .references('lesson.id')
      .onDelete('CASCADE');
    table
      .foreign('site_id')
      .references('site.id')
      .onDelete('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('lesson_site');
