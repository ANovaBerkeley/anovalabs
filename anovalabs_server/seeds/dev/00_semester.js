const seed = require('../../newseedData/00_semester_seed');
exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('semester')
    .del()
    .then(function() {
    	//reset autoincrement
      return knex.raw('ALTER SEQUENCE semester_id_seq RESTART WITH 1').then(function(){
      // Inserts seed entries
      	return knex('semester').insert(seed);
  		})
    });
};
