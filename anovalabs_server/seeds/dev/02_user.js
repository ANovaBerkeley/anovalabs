const seed = require('../../newseedData/02_user_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user').insert(seed);
    });
};
