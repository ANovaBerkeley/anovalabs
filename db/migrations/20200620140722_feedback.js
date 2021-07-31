exports.up = knex =>
  knex.schema.createTable('feedback', table => {
    table.increments();
    table.integer('uid').comment('user id');
    table.integer('lesson_id').comment('lesson id');
    table.string('text').comment('feedback/text');
    table.integer('rating').comment('rating in range 1-5');
    table.boolean('mentor').comment('student or mentor')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('gtext').comment('general feedback');
    table.string('site_name').comment('site of user');
  });

exports.down = knex => knex.raw('DROP TABLE IF EXISTS feedback CASCADE');