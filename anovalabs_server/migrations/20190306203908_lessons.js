exports.up = knex =>
  knex.schema.createTable('lesson', table => {
    table.increments();
    table.string('title').comment('title of lesson');
    table.string('summary').comment('summary of what the lesson will be about');
    table.string('link').comment('google slides link');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists('lesson');
