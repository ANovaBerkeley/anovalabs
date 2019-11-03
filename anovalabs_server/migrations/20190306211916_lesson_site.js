
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('lesson_site', function(table) {
    	table.increments();
    	table
        .integer('lesson_id')
        .notNullable()
        .unsigned();
      table
        .integer('site_id')
        .notNullable()
        .unsigned();
    table.timestamp('date').defaultTo(knex.fn.now());
      table
        .foreign('lesson_id')
        .references('lesson.id')
        .onDelete('CASCADE');
      table
        .foreign('site_id')
        .references('site.id')
        .onDelete('CASCADE');
});
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('lesson_site');
};
