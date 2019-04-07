const seed = require('../../newseedData/12_permission_role_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('role_permission')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('role_permission').insert(seed);
    });
};
