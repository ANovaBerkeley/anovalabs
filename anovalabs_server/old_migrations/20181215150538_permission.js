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
    .createTable('permission', function(table) {
      table.increments();
      table.string('role');
      table.integer('create');
      table.integer('read');
      table.integer('update');
      table.integer('delete');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => updateTimestampTrigger(knex, 'permission'))
    .then(() => {
      return knex('permission').insert([
        { role: 'Admin', create: 1, read: 1, update: 1, delete: 1 },
        { role: 'Mentor', create: 1, read: 1, update: 1, delete: 1 },
        { role: 'Site Leader', create: 1, read: 1, update: 1, delete: 1 },
        { role: 'Student', create: 1, read: 1, update: 1, delete: 1 }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('permission');
};
