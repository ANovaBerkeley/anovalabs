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
    .createTable('write', function(table) {
      table.increments();
      table.string('status').comment('status on writing entity - draft or publish');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => updateTimestampTrigger(knex, 'write'))
    .then(() => {
      return knex('write').insert([{ status: 'Draft' }, { status: 'Publish' }]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('write');
};
