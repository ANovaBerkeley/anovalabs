const seed = require('../../seedData/09_site_lesson_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('site_lesson')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('site_lesson').insert(seed);
    });
};
