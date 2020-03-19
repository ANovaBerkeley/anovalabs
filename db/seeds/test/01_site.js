const seed = require('../../seed_data/test/01_site_seed');

exports.seed = knex =>
  knex('site')
    .del()
    .then(() =>
      knex
        .raw('ALTER SEQUENCE site_id_seq RESTART WITH 1')
        .then(() => knex('site').insert(seed)),
    );
