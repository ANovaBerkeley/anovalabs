
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('site', function(table) {
      table.increments();
      table.string('schoolName')
      		.notNullable();
      table.string('classroom');
      table.string('level');
      table.string('time')
      		.notNullable();
      table.string('contact')
      		.notNullable();
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('site');
};