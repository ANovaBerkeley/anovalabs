exports.up = knex =>
  knex.schema.createTable('feedback', table => {
    table.increments();
    table.int('user_id').comment('user id');
    table.int('lesson_id').comment('lesson id');
    table.string('text').comment('feedback/text');
    table.int('rating').comment('rating in range 1-5');
    table.boolean('mentor').comment('student or mentor')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.raw('DROP TABLE IF EXISTS lesson CASCADE');
