const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* Retrieve a user's profile based on their id.
TODO: ensure that this cannot be called from a different user's account. */
router.get('/:id', (req, res) => {
  const userid = req.query.uid;

  db.select('user.email', 'user.picture', 'user.grade', 'user.name', 'user.bio', 'user.notes')
    .from('user')
    .where('user.id', userid)
    .then(data => {
      res.send(data);
    });
});

/* Update a user's profile. */
// TODO: Change to update photo in knex statement once adding pictures work
router.post('/update', (req, res, next) => {
  for (let requiredParameter of ['id']) {
    if (!req.body[requiredParameter]) {
      return res
        .status(422)
        .send({ error: `Expected format: { notes: <String> , id: <int>}. You're missing a "${requiredParameter}" property.` });
    }
  }

  knex('user')
    .where({ id: req.body.id })
    .update({ notes: req.body.notes, bio: req.body.bio, grade: req.body.grade })
    .then(data => {
      res.status(201).json({ id: req.body.id });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
