// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/anovalabs-db',
    seeds: {
      directory: './seeds/dev'
    },
  test: {
        client: 'postgresql',
        connection: 'postgres://localhost/test-anovalabs-db',
        seeds: {
          directory: './seeds/dev'
        }
  }

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
}
}
