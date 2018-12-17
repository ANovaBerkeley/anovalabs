//this is the connection to the database
const knex = require('./knex');

module.exports = {
  getAll: () => {
    return knex('lesson');
  },
  getOne: id => {
    return knex('lesson')
      .where('id', id)
      .first();
  },
  create: lesson => {
    return knex('lesson').insert(lesson, '*');
  },
  update: (id, lesson) => {
    return knex('lesson')
      .where('id', id)
      .update(lesson, '*');
  },
  delete: id => {
    return knex('lesson')
      .where('id', id)
      .del();
  }
};
