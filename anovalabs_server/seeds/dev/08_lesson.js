const seed = require('../../seedData/08_lesson_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lesson')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('lesson').insert(seed);
    });
};
