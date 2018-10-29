//this is the connection to the database
const knex = require('./knex'); 

module.exports = {
    getAll: function() {
        return knex('account');
    },
    getOneById: function(id) {
        return knex('account').where('accountId',id).first();
    },
    getOneByEmail: function(email) {
        return knex('account').where('email',email).first();
    },
    create: function(account){
        return knex('account').insert(account, '*');
    },
    update: function(id, account) {
        return knex('account').where('accountId', id).update(account, '*');
    },
    delete: function (id) {
        return knex('account').where('accountId',id).del();
    }
}