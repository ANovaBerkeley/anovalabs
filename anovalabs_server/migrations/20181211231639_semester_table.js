exports.up = function(knex, Promise) {
  return knex.schema.createTable('semester', function(table) {
    table.increments();
    table.string('semester').comment('Fall');
    table.integer('year').comment('2019');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('semester');
};
