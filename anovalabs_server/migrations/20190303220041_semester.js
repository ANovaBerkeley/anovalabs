
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('semester', function(table) {
      table.increments();
      table.integer('year')
      		.notNullable()
        	.unsigned();
      table.string('semester')
      		.notNullable();

	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('semester');
};
