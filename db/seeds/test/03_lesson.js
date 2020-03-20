const seed = require('../../seed_data/test/03_lesson_seed');

exports.seed = knex =>
  knex('lesson')
    .del()
    .then(() =>
      knex
        .raw('ALTER SEQUENCE site_id_seq RESTART WITH 1')
        .then(() => knex('lesson').insert(seed)),
    );
