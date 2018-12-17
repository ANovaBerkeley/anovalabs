const seed = require('../../seedData/06_account_role_permission_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account_role_permission')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('account_role_permission').insert(seed);
    });
};
