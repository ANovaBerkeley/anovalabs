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
    table.json('description_state').comment('description on lesson page');
    table.json('resources_state').comment('resources on lesson page');
    table.json('lab_state').comment('lab on lesson page');
    table.json('exit_ticket_state').comment('exit ticket on lesson page');
  });

exports.down = knex => knex.raw('DROP TABLE IF EXISTS lesson CASCADE');
