const seed = require('../../newseedData/15_user_semester_site_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_semester_site')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_semester_site').insert(seed);
    });
};
