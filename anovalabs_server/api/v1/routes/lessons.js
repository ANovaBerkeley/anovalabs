const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

router.get('/site', (req, res) => {
  const userid = 1;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  db.select('site.schoolName')
    .from('site')
    .then(data => {
      res.send(data);
    });
});


/* Class interacting with the lesson pool. */

/* Retrieve all lessons from the lesson pool. */
router.get('/all', (req, res) => {
  db.select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link')
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
  for (let requiredParameter of ['id']) {
      if (!req.body[requiredParameter]) {
        return res
          .status(422)
          .send({ error: `Expected format: { title: <String>}. You're missing a "${requiredParameter}" property.` });
      }
    }

  knex('lesson')
    .where({ id: req.body.id })
    .del()
    .then(data => {
      res.status(201).json({ id: req.body.id });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});


module.exports= router;
