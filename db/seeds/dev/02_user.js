const seed = require('../../seed_data/02_user_seed');

exports.seed = knex =>
  knex('user')
    .del()
    .then(() =>
      knex
        .raw('ALTER SEQUENCE site_id_seq RESTART WITH 1')
        .then(() => knex('user').insert(seed)),
    );
