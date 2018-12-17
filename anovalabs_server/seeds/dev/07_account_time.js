const seed = require('../../seedData/07_account_time_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account_time')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('account_time').insert(seed);
    });
};
