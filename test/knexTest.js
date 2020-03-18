const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'test-anovalabs-db',
  },
});

module.exports = knex;
