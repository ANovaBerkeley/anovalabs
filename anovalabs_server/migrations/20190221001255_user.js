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
    .createTable('user', function(table) {
      table.increments();

      table
        .integer('account_id')
        .unique()
        .index();

      table
        .string('email')
        .unique()
        .notNullable();

      table
        .string('first_name')
        .notNullable();

      table
        .string('last_name')
        .notNullable();

      table
        .text('bio');

      table
        .text('notes');

      table
        .string('picture');

      table
        .string('grade')
        .notNullable();

      table.string('password').notNullable();
    })
    .then(() => updateTimestampTrigger(knex, 'local'))
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('term');
};
