
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('attendance', function(table) {
      table.increments();
      table
        .string('date')
        .notNullable();
      table
      	.boolean('present')
      	.notNullable();
    });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('attendance');
};
