const accounts_roles = require('../seedData/accounts_roles');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account_role').del()
    .then(function () {
      // Inserts seed entries
      return knex('account_role').insert(accounts_roles);
    });
};