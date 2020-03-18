const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'anovalabs-db',
  },
});

module.exports = knex;
