const seed = require('../../seedData/05_local_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('local')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('local').insert(seed);
    });
};
