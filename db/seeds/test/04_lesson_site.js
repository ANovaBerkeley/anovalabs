const seed = require('../../seed_data/test/04_lesson_site_seed');

exports.seed = knex =>
  knex('lesson_site')
    .del()
    .then(() =>
      knex
        .raw('ALTER SEQUENCE site_id_seq RESTART WITH 1')
        .then(() => knex('lesson_site').insert(seed)),
    );
