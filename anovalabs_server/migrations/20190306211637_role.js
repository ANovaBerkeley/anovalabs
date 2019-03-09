
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('role', function(table) {
      table.increments();
      table.string('roleName')
      		.notNullable();
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('role');
};