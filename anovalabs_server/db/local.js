// this is the connection to the database

const knex = require('./knex');

module.exports = {
  getAll: () => {
    return knex('local');
  },
  getOneById: id => {
    return knex('local')
      .where('id', id)
      .first();
  },
  getOneByEmail: email => {
    return knex('local')
      .where('email', email)
      .first();
  },
  create: local => {
    return knex('local').insert(local, '*');
  },
  update: (id, local) => {
    return knex('local')
      .where('id', id)
      .update(local, '*');
  },
  delete: id => {
    return knex('local')
      .where('id', id)
      .del();
  }
};
