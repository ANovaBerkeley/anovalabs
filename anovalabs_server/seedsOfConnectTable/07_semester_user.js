const seed = require('../../newseedData/07_semester_user_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('semester_user')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('semester_user').insert(seed);
    });
};
