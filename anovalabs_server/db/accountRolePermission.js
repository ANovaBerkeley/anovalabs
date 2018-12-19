// this is the connection to the database

const knex = require('./knex');

module.exports = {
  getAll: () => {
    return knex('account_role_permission');
  },
  getOneById: id => {
    return knex('account_role_permission')
      .where('id', id)
      .first();
  },
  create: accountRoleRermission => {
    return knex('account_role_permission').insert(accountRoleRermission, '*');
  },
  update: (id, accountRoleRermission) => {
    return knex('account_role_permission')
      .where('id', id)
      .update(accountRoleRermission, '*');
  },
  delete: id => {
    return knex('account_role_permission')
      .where('id', id)
      .del();
  }
};
