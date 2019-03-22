const seed = require('../../newseedData/11_lesson_site_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lesson_site')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('lesson_site').insert(seed);
    });
};
