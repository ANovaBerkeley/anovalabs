
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('semester_site', function(table) {
    	table.increments();
    	table
        .integer('semester_id')
        .notNullable()
        .unsigned();
      table
        .integer('site_id')
        .notNullable()
        .unsigned();
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
