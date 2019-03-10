
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user_role', function(table) {
    	table.increments();
    	table
        .integer('user_id')
        .notNullable()
        .unsigned();
      table
        .integer('role_id')
        .notNullable()
        .unsigned();
    	table
        .foreign('user_id')
        .references('user.id')
        .onDelete('CASCADE');
      table
        .foreign('role_id')
        .references('role.id')
        .onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_role');
};
