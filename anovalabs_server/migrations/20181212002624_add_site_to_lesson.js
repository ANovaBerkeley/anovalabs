exports.up = function(knex, Promise) {
  return knex.schema.table('lesson', function(table) {
    table.integer('site').unsigned();
    table.foreign('site').references('site.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('lesson', function(table) {
    table.dropColumn('site');
  });
};
