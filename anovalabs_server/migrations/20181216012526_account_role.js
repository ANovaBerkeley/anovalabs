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
    .createTable('account_role', function(table) {
      table.increments();
      table
        .integer('account_id')
        .notNullable()
        .unsigned();
      table
        .integer('role_id')
        .notNullable()
        .unsigned();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table
        .foreign('account_id')
        .references('account.id')
        .onDelete('CASCADE');

      table
        .foreign('role_id')
        .references('role.id')
        .onDelete('CASCADE');
    })
    .then(() => updateTimestampTrigger(knex, 'account_role'))
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('account_role');
};
