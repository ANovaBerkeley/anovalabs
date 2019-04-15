const seed = require('../../newseedData/08_lesson_user_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lesson_user')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('lesson_user').insert(seed);
    });
};
