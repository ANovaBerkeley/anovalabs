
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user', function(table) {
      table.increments();
      table
        .string('email')
        .unique()
        .notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
