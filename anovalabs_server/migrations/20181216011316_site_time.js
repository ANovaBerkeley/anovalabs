function updateTimestampTrigger(knex, tableName) {
  return knex.raw(`
                                            CREATE OR REPLACE FUNCTION update_modified_column()
                                            RETURNS TRIGGER AS $$
                                            BEGIN
                                              NEW.updated_at = now();
                                              RETURN NEW;
                                            END;
                                            $$ language 'plpgsql';

                                            CREATE TRIGGER update_${tableName}_updated_at
                                            BEFORE UPDATE ON ${tableName}
                                            FOR EACH ROW
                                            EXECUTE PROCEDURE update_modified_column();
                                          `);
}
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('site_time', function(table) {
      table.increments();
      table
        .integer('site_id')
        .notNullable()
        .unsigned();
      table
        .integer('time_id')
        .notNullable()
        .unsigned();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table
        .foreign('site_id')
        .references('site.id')
        .onDelete('CASCADE');
      table
        .foreign('time_id')
        .references('time.id')
        .onDelete('CASCADE');
    })
    .then(() => updateTimestampTrigger(knex, 'site_time'))
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('site_time');
};
