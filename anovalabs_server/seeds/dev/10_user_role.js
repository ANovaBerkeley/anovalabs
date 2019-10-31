const seed = require('../../seed_data/10_user_role_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_role')
    .del()
    .then(function() {
       //reset autoincrement
        return knex.raw('ALTER SEQUENCE user_role_id_seq RESTART WITH 1').then(function(){
      // Inserts seed entries
          	return knex('user_role').insert(seed);
      		})
    });
};
