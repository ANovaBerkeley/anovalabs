
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user_attendance', function(table) {
    	table.increments();
    	table
        .integer('user_id')
        .notNullable()
        .unsigned();
      table
        .integer('attendance_id')
        .notNullable()
        .unsigned();	
    	table
        .foreign('user_id')
        .references('user.id')
        .onDelete('CASCADE');
      table
        .foreign('attendance_id')
        .references('attenedance.id')
        .onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_attendance');
};
