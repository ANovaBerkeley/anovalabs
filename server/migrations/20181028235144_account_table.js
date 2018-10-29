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
      .createTable("account", function(table) {
        table
          .increments("accountId")
          .comment("Primary key of account table that auto increments");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table
          .text("email")
          .unique()
          .notNullable();
        table.text("password").notNullable();
      })
      .then(() => updateTimestampTrigger(knex, "account"));
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("account");
  };
  