const accounts = require('../seedData/accounts');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account').del()
    .then(function () {
      // Inserts seed entries
      return knex('account').insert(accounts);
    });
};
