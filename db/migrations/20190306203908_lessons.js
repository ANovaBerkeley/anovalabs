exports.up = knex =>
  knex.schema.createTable('lesson', table => {
    table.increments();
    table.string('title').comment('title of lesson');
    table.string('summary').comment('summary of what the lesson will be about');
    table.string('link').comment('google slides link');
    table.string('level').comment('middle/high school');
    table.string('language').comment('coding language');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('descriptionHTML').comment('description on lesson page');
    table.string('resourcesHTML').comment('description on lesson page');
    table.string('labHTML').comment('description on lesson page');
    table.string('exitTicketHTML').comment('description on lesson page');
    table.string('mentor feedback').defaultTo('mentor feedback');
  });

exports.down = knex => knex.raw('DROP TABLE IF EXISTS lesson CASCADE');
