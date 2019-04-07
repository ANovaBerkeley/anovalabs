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
    .createTable('week', function(table) {
      table.increments();
      table.integer('week').comment('A week that reflects the lesson plan');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => updateTimestampTrigger(knex, 'week'))
    .then(() => {
      return knex('week').insert([
        { week: 1 },
        { week: 2 },
        { week: 3 },
        { week: 4 },
        { week: 5 },
        { week: 6 },
        { week: 7 },
        { week: 8 },
        { week: 9 },
        { week: 10 },
        { week: 11 },
        { week: 12 }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('week');
};
