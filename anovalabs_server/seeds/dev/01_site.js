const site_seed = require('../../newseedData/01_site_seed');

exports = function seed(knex, Promise) {

  // Deletes ALL existing entries
  return knex('site').del().then(function() {
  //reset autoincrement
    return knex.raw('ALTER SEQUENCE site_id_seq RESTART WITH 1').then(function(){
  // Inserts seed entries
      	return knex('site').insert(site_seed);
  		})
    });
};
