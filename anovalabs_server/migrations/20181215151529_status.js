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
    .createTable('status', function(table) {
      table.increments();
      table.string('status').comment('Approval stage for requesting access');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => updateTimestampTrigger(knex, 'status'))
    .then(() => {
      return knex('status').insert([
        { status: 'Approved' },
        { status: 'Pending' },
        { status: 'Rejected' }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('status');
};
