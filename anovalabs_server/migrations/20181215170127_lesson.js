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
    .createTable('lesson', function(table) {
      table.increments();
      table.string('title').comment('title of lesson');
      table.string('summary').comment('summary of what the lesson will be about');
      table.text('guide').comment('guide for mentors - written in markdown');
      table.text('plan').comment('lesson plan for students - written in markdown');
      table.integer('week_id');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table
        .foreign('week_id')
        .references('week.id')
        .onDelete('CASCADE');
    })
    .then(() => updateTimestampTrigger(knex, 'lesson'))
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('lesson');
};
