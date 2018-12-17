//this is the connection to the database
const knex = require('./knex');

module.exports = {
  getAll: () => {
    return knex('account');
  },
  getOneById: id => {
    return knex('account')
      .where('id', id)
      .first();
  },
  getOneByEmail: email => {
    return knex('account')
      .where('email', email)
      .first();
  },
  create: account => {
    return knex('account').insert(account, '*');
  },
  update: (id, account) => {
    return knex('account')
      .where('accountId', id)
      .update(account, '*');
  },
  delete: id => {
    return knex('account')
      .where('accountId', id)
      .del();
  }
};
