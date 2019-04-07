const seed = require('../../newseedData/09_semester_site_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('semester_site')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('semester_site').insert(seed);
    });
};
