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
    .createTable('term', function(table) {
      table.increments();
      table.string('term');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => updateTimestampTrigger(knex, 'term'))
    .then(() => {
      return knex('term').insert([{ term: 'Fall' }, { term: 'Spring' }]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('term');
};
