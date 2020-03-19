require('dotenv').load();
path = require('path');
// path.join(__dirname, '../test/karma.conf.js');
const knex = require('knex')({
  client: 'pg',
  connection: process.env.TEST_DATABASE_URL,
  migrations: { directory: path.join(__dirname, '../db/migrations') },
  seeds: {
    directory: path.join(__dirname, '../db/seeds/test'),
  },
});

module.exports = knex;
