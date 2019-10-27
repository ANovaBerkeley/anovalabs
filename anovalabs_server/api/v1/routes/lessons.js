const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* Class interacting with the lesson pool. */

/* Retrieve all lessons from the lesson pool. */
router.get('/all', (req, res) => {
  db.select('lesson.title', 'lesson.summary', 'lesson.link')
    .from('lesson')
    .then(data => {
      res.send(data);
    });
});


/* Add a lesson to the lesson pool. */
router.post('/add', (req, res, next) => {
  for (let requiredParameter of ['title', 'link', 'summary']) {
    if (!req.body[requiredParameter]) {
      return res
        .status(422)
        .send({ error: `Expected format: { title: <String>, link: <String>, summary: <String> }. You're missing a "${requiredParameter}" property.` });
      }
    }

  knex('lesson').insert(req.body)
    .then(data => {
      res.status(201).json({ title: req.body.title });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

/* Delete a lesson from the lesson pool. */
router.post('/delete', (req, res, next) => {
  for (let requiredParameter of ['title']) {
      if (!req.body[requiredParameter]) {
        return res
          .status(422)
          .send({ error: `Expected format: { title: <String>}. You're missing a "${requiredParameter}" property.` });
      }
    }

  knex('lesson')
    .where({ title: req.body.title })
    .del()
    .then(data => {
      res.status(201).json({ title: req.body.title });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});


module.exports= router;
