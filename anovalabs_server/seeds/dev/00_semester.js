const seed = require('../../seedData/00_semester_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('semester')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('semester').insert(seed);
    });
};
