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
    .createTable('authentication', function(table) {
      table.increments();
      table.string('method').comment('method of authentication for user');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => updateTimestampTrigger(knex, 'authentication'))
    .then(() => {
      return knex('authentication').insert([{ method: 'Local' }, { method: 'Google' }]);
    })
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('authentication');
};
