const seed = require('../../seedData/02_time_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('time')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('time').insert(seed);
    });
};
