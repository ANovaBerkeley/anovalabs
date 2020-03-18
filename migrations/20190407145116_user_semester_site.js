exports.up = knex =>
  knex.schema.createTable('user_semester_site', table => {
    table.increments();
    table
      .integer('user_id')
      .notNullable()
      .unsigned();
    table.string('semester').notNullable();
    table
      .integer('site_id')
      .notNullable()
      .unsigned();

    table
      .foreign('user_id')
      .references('user.id')
      .onDelete('CASCADE');
    table
      .foreign('site_id')
      .references('site.id')
      .onDelete('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('semester_site');
