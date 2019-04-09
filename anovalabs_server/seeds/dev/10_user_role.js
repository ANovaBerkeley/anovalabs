const seed = require('../../newseedData/10_user_role_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_role')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_role').insert(seed);
    });
};