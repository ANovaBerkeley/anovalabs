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
    .createTable('semester', function(table) {
      table.increments();
      table.integer('term_id');
      table.integer('year_id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table
        .foreign('term_id')
        .references('term.id')
        .onDelete('CASCADE');
      table
        .foreign('year_id')
        .references('year.id')
        .onDelete('CASCADE');
    })
    .then(() => updateTimestampTrigger(knex, 'semester'))
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('semester');
};
