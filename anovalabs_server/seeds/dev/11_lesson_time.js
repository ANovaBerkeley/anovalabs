const seed = require('../../seedData/11_lesson_time_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lesson_time')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('lesson_time').insert(seed);
    });
};
