function updateTimestampTrigger (knex, tableName) {
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
        `)
}

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("lesson", function(table) {
      table
        .increments("lessonId")
        .comment("Primary key of Lesson table that auto increments");
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())

      table.string("title").comment("Title of Lesson Plan");
      table
        .text("summary")
        .comment("Provides a blurb of what the lesson covers");
      table
        .text("lessonPlan")
        .comment("lesson guide for mentor with goals and tips");
      table.integer("week").comment("What week this lesson belongs to");
      table
        .integer("day")
        .comment("Lessons are broken into days for a given week");
      table.text("slides").comment("For now, a link to google slides");
      table
        .text("resources")
        .comment("for now, a link to github or google drive");
      table
        .text("exitTicket")
        .comment("feedback from students, for now a link to");
      table.text("qcLeader").comment("quality control Leader of the Lesson");
      table.text("siteLeader").comment("Site Leader in charge of site");
      table
        .string("site")
        .comment("Site this lesson belongs to - example: ROOTS");
      table
        .string("semester")
        .comment("Semester this lesson belongs to - example: Fall 2018");
    })
    .then(() => updateTimestampTrigger(knex,'lesson'));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("lesson");
};