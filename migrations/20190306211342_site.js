exports.up = knex =>
  knex.schema.createTable('site', table => {
    table.increments();
    table.string('schoolName').notNullable();
    table.string('classroom');
    table.string('level');
    table.string('time').notNullable();
    table.string('contact').notNullable();
  });

exports.down = knex => knex.raw('DROP TABLE IF EXISTS site CASCADE');
