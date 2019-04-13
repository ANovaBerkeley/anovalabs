const seed = require('../../newseedData/03_lesson_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lesson').del().then(function() {
  //reset autoincrement
    return knex.raw('ALTER SEQUENCE lesson_id_seq RESTART WITH 1').then(function(){
  // Inserts seed entries
      	return knex('lesson').insert(seed);
  		})
    });
};
