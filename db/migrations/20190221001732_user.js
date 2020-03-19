exports.up = knex =>
  knex.schema.createTable('user', table => {
    table.increments();
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('picture');
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.string('role').notNullable();
    table.string('notes');
    table.string('candy');
    table.string('hobby');
  });

exports.down = knex => knex.raw(`DROP TABLE IF EXISTS "user" CASCADE`);
