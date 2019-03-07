
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('lesson_user', function(table) {
    	table.increments();
    	table
        .integer('lesson_id')
        .notNullable()
        .unsigned();
      table
        .integer('user_id')
        .notNullable()
        .unsigned();
    	table
        .foreign('lesson_id')
        .references('lesson.id')
        .onDelete('CASCADE');
      table
        .foreign('user_id')
        .references('user.id')
        .onDelete('CASCADE');
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('lesson_user');
};
