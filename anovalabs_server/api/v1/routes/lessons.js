const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* Class interacting with the lesson pool. */

/* Get all lessons from the semester and site of that user.
TODO: replace hardcoded userid */

router.get('/', (req, res) => {
  const userid = 1;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  db.select('lesson.title', 'lesson.summary', 'lesson.link', 'lesson_site.date')
    .from('site')
    .join('lesson_site', 'lesson_site.site_id', 'site.id')
    .join('lesson', 'lesson_site.lesson_id', 'lesson.id')
    .where('site.id', siteid)
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

/* TODO: figure out what this does */
router.post('/addLessonSite', (req, res, next) => {
  for (let requiredParameter of ['lesson_id', 'site_id']) {
      if (!req.body[requiredParameter]) {
        return res
          .status(422)
          .send({ error: `Expected format: { lesson_id: <int>, site_id: <int>}. You're missing a "${requiredParameter}" property.` });
      }
    }

  knex('lesson_site')
    .insert({ lesson_id: req.body.lesson_id, site_id: req.body.site_id })
    .then(data => {
      res.status(201).json({ title: req.body.title });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports= router;
