const seed = require('../../newseedData/06_permission_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permission')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('permission').insert(seed);
    });
};
