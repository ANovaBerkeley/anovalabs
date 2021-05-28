const seed = require('../../seed_data/development/06_feedback_seed');

exports.seed = knex =>
  knex('feedback')
    .del()
    .then(() =>
      knex
        .raw('ALTER SEQUENCE site_id_seq RESTART WITH 1')
        .then(() => knex('feedback').insert(seed)),
    );
