const seed = require('../../seed_data/02_user_seed');
exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('user').del().then(function() {
  //reset autoincrement
    return knex.raw('ALTER SEQUENCE user_id_seq RESTART WITH 1').then(function(){
  // Inserts seed entries
      	return knex('user').insert(seed);
  		})
    });
};
