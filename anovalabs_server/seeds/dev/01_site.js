const seed = require('../../newseedData/01_site_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('site')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('site').insert(seed);
    });
};
