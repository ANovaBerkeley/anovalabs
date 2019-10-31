const seed = require('../../seed_data/15_user_semester_site_seed');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_semester_site')
    .del()
    .then(function() {
      return knex.raw('ALTER SEQUENCE user_semester_site_id_seq RESTART WITH 1').then(function(){
        // Inserts seed entries
            	return knex('user_semester_site').insert(seed);
        		})
    });
};
