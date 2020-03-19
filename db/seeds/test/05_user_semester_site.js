const seed = require('../../seed_data/test/05_user_semester_site_seed');

exports.seed = knex =>
  knex('user_semester_site')
    .del()
    .then(() =>
      knex
        .raw('ALTER SEQUENCE site_id_seq RESTART WITH 1')
        .then(() => knex('user_semester_site').insert(seed)),
    );
