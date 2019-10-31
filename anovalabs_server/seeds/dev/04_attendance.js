const seed = require('../../seed_data/04_attendance_seed');
exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('attendance').del().then(function() {
  //reset autoincrement
    return knex.raw('ALTER SEQUENCE attendance_id_seq RESTART WITH 1').then(function(){
  // Inserts seed entries
      	return knex('attendance').insert(seed);
  		})
    });
};
