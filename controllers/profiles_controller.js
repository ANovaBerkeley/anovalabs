const knex = require('../db/knex');

/* Retrieve a user's profile based on their id. */
const getProfileById = (req, res, next) => {
  const userid = req.query.uid;

  knex
    .select(
      'user.email',
      'user.picture',
      'user.candy',
      'user.name',
      'user.hobby',
      'user.notes',
      'user.role',
    )
    .from('user')
    .where('user.id', userid)
    .then(data => {
      return res.status(200).send(data);
    });
};
/* Update a user's profile. */
const update = (req, res, next) => {
  knex('user')
    .where({ id: req.body.id })
    .update({ hobby: req.body.hobby, candy: req.body.candy, notes: req.body.notes })
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = {
  getProfileById: getProfileById,
  update: update,
};
