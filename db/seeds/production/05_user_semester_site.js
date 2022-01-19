const seed = require('../../seed_data/production/05_user_site_seed');

exports.seed = knex =>
  knex('user_site')
    .del()
    .then(() =>
      knex
        .raw('ALTER SEQUENCE site_id_seq RESTART WITH 1')
        .then(() => knex('user_site').insert(seed)),
    );
