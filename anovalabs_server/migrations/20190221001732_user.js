
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user', function(table) {
      table.increments();
      table
        .string('email')
        .unique()
        .notNullable();
      table
      	.string('picture');
      table
      	.string('password')
      	.notNullable();
      table
      	.string('name')
      	.notNullable();
      table
        .string('role')
        .notNullable();
      table
      	.string('notes');
      table
        .string('candy');
      table
        .string('hobby');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
