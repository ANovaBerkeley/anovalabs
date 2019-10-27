const seed = require('../../newseedData/01_site_seed');

exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('site').del().then(function() {
  //reset autoincrement
    return knex.raw('ALTER SEQUENCE site_id_seq RESTART WITH 1').then(function(){
  // Inserts seed entries
      	return knex('site').insert(seed);
  		})
    });
};
