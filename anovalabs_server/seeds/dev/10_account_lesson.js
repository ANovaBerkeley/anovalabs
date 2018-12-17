const seed = require('../../seedData/10_account_lesson_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account_lesson')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('account_lesson').insert(seed);
    });
};
