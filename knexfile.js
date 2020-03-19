// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/anovalabs-db',
    seeds: {
      directory: './db/seeds/dev',
    },
  },
  test: {
    client: 'postgresql',
    connection: 'postgres://localhost/test-anovalabs-db',
    seeds: {
      directory: './db/seeds/dev',
    },
  },
  production: {
    client: process.env.PG_CLIENT,
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds/production',
    },
  },
};
