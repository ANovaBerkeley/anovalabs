const knex = require('knex')({
	client: 'psql',
	connection : {
		host: 'localhost',
		database: 'anovalabs-db'
	}
});

module.exports = knex;
