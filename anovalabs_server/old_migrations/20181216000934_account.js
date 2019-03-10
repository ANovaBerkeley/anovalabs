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
    .createTable('account', function(table) {
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.integer('authentication_id').comment('Which method did the user authenticate with');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table
        .foreign('authentication_id')
        .references('authentication.id')
        .onDelete('CASCADE');
    })
    .then(() => updateTimestampTrigger(knex, 'account'))
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('account');
};
