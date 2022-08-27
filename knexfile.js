// Update with your config settings.
require('dotenv').load();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOSTNAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: { directory: __dirname + '/db/migrations' },
    seeds: {
      directory: __dirname + '/db/seeds/development',
    },
  },
  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
    migrations: { directory: __dirname + '/db/migrations' },
    seeds: {
      directory: __dirname + '/db/seeds/test',
    },
  },
  production: {
    client: 'pg',
    ssl: true,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: { directory: __dirname + '/db/migrations' },
    seeds: {
      directory: __dirname + '/db/seeds/production',
    },
  },
};
