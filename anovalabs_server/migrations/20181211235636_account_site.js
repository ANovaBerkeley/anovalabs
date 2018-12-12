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
//  this is an associate table to allow us to assign multiple sites to an account in the future
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('account_site', function(table) {
      table.increments();
      table
        .integer('account')
        .unsigned()
        .notNullable();
      table
        .integer('site')
        .unsigned()
        .notNullable();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.foreign('account').references('account.accountId');
      table.foreign('site').references('site.id');
    })
    .then(() => updateTimestampTrigger(knex, 'account_site'));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('account_site');
};
