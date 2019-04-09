const seed = require('../../newseedData/14_attendance_site_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attendance_site')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('attendance_site').insert(seed);
    });
};