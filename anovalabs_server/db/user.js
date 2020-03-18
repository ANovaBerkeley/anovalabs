// this is the connection to the database

const knex = require('./knex');

module.exports = {
  getAll: () => {
    return knex('user');
  },
  getOneById: id => {
    return knex('user')
      .where('id', id)
      .first();
  },
  getOneByEmail: email => {
    return knex('user')
      .where('email', email)
      .first();
  },
  create: user => {
    return knex('user').insert(user, '*');
  },
  update: (id, user) => {
    return knex('user')
      .where('id', id)
      .update(user, '*');
  },
  delete: id => {
    return knex('user')
      .where('id', id)
      .del();
  },
};
