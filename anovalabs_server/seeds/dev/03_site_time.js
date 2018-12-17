const seed = require('../../seedData/03_site_time_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('site_time')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('site_time').insert(seed);
    });
};
