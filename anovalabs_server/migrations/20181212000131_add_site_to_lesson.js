exports.up = function(knex, Promise) {
  return knex.schema.table('lesson', function(table) {
    table.dropColumn('site');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('lesson', function(table) {
    table.string('site').comment('Site this lesson belongs to - example: ROOTS');
  });
};
