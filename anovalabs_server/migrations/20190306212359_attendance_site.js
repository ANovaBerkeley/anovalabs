
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('attendance_site', function(table) {
    	table.increments();
    	table
        .integer('attendance_id')
        .notNullable()
        .unsigned();
      table
        .integer('site_id')
        .notNullable()
        .unsigned();
    	table
        .foreign('attendance_id')
        .references('attendance.id')
        .onDelete('CASCADE');
      table
        .foreign('site_id')
        .references('site.id')
        .onDelete('CASCADE');
	});
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('attendance_site');
};
