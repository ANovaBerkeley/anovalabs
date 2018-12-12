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
//this is an associate table to allow us to assign multiple roles in the future to each account
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('site', function(table) {
      table.increments();
      table.string('name').comment('Name of Site');
      table.string('type').comment('Middle School or High School or Adult Education');
      table
        .integer('semester')
        .unsigned()
        .notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.foreign('semester').references('semester.id');
    })
    .then(() => updateTimestampTrigger(knex, 'site'));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('site');
};
