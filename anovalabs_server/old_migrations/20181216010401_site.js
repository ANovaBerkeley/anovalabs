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
    .createTable('site', function(table) {
      table.increments();
      table
        .integer('semester_id')
        .notNullable()
        .unsigned();

      table
        .integer('style_id')
        .notNullable()
        .unsigned();

      table
        .integer('level_id')
        .notNullable()
        .unsigned();

      table
        .integer('school_id')
        .notNullable()
        .unsigned();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table
        .foreign('semester_id')
        .references('semester.id')
        .onDelete('CASCADE');
      table
        .foreign('style_id')
        .references('style.id')
        .onDelete('CASCADE');
      table
        .foreign('level_id')
        .references('level.id')
        .onDelete('CASCADE');
      table
        .foreign('school_id')
        .references('school.id')
        .onDelete('CASCADE');
    })
    .then(() => updateTimestampTrigger(knex, 'site'))
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('site');
};
