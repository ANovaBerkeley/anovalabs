const seed = require('../../seed_data/05_role_seed');
exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('role').del().then(function() {
  //reset autoincrement
    return knex.raw('ALTER SEQUENCE role_id_seq RESTART WITH 1').then(function(){
  // Inserts seed entries
      	return knex('role').insert(seed);
  		})
    });
};
