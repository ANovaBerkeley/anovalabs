const seed = require('../../newseedData/06_permission_seed');
exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('permission').del().then(function() {
  //reset autoincrement
    return knex.raw('ALTER SEQUENCE permission_id_seq RESTART WITH 1').then(function(){
  // Inserts seed entries
      	return knex('permission').insert(seed);
  		})
    });
};
