
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('permission', function(table) {
      table.increments();
      table.string('permissionName')
      		.notNullable();
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('permission');
};