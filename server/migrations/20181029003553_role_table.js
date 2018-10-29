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
      .createTable("role", function(table) {
        table
          .increments("roleId")
          .comment("Primary key of membership table that auto increments");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.enu('roles', ['ADMIN', 'STUDENT', 'MENTOR','SITE LEADER', 'GUEST']);
        table
          .text("description")
          .notNullable().comment("Provides description of roles");
      })
      .then(() => updateTimestampTrigger(knex, "role"));
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("role");
  };
  