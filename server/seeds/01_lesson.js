const lessons = require('../seedData/lessons');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lesson').del()
    .then(function () {
      // Inserts seed entries
      return knex('lesson').insert(lessons);
    });
};
