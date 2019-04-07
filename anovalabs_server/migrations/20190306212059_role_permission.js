
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('role_permission', function(table) {
    	table.increments();
    	table
        .integer('role_id')
        .notNullable()
        .unsigned();
      table
        .integer('permission_id')
        .notNullable()
        .unsigned();
    	table
        .foreign('role_id')
        .references('user.id')
        .onDelete('CASCADE');
      table
        .foreign('permission_id')
        .references('role.id')
        .onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('role_permission');
};
