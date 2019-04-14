
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user_semester_site', function(table) {
    	table.increments();
    	table
        .integer('user_id')
        .notNullable()
        .unsigned();
    	table
        .integer('semester_id')
        .notNullable()
        .unsigned();
      table
        .integer('site_id')
        .notNullable()
        .unsigned();

        table
        .foreign('user_id')
        .references('user.id')
        .onDelete('CASCADE');
    	table
        .foreign('semester_id')
        .references('semester.id')
        .onDelete('CASCADE');
      table
        .foreign('site_id')
        .references('site.id')
        .onDelete('CASCADE');
    });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('semester_site');
};
