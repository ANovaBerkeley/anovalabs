const seed = require('../../newseedData/12_permission_role_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('role_permission')
    .del()
    .then(function() {
      //reset autoincrement
        return knex.raw('ALTER SEQUENCE role_permission_id_seq RESTART WITH 1').then(function(){
      // Inserts seed entries
            return knex('role_permission').insert(seed);
          })
    });
};
