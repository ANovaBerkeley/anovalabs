const seed = require('../../newseedData/13_attendance_user_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_attendance')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_attendance').insert(seed);
    });
};
