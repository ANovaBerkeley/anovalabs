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
    .createTable('weekday', function(table) {
      table.increments();
      table.string('day');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => updateTimestampTrigger(knex, 'weekday'))
    .then(() => {
      return knex('weekday').insert([
        { day: 'Monday' },
        { day: 'Tuesday' },
        { day: 'Wednesday' },
        { day: 'Thursday' },
        { day: 'Friday' },
        { day: 'Saturday' },
        { day: 'Sunday' }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('weekday');
};
