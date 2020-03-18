const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* Retrieve a user's profile based on their id. */
router.get('/:id', (req, res) => {
  const userid = req.query.uid;

  db.select(
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
      res.status(200).send(data);
    });
});

/* Update a user's profile. */
router.post('/update', (req, res) => {
  knex('user')
    .where({ id: req.body.id })
    .update({ hobby: req.body.hobby, candy: req.body.candy, notes: req.body.notes })
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
