const seed = require('../../seedData/04_account_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('account').insert(seed);
    });
};
