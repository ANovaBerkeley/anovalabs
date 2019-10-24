const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* TODO: (1) sort by date, return date in readable format */

router.get('/', (req, res) => {
  db.select()
    .from('lesson_site')
    .then(data => {
      res.send(data);
    });
});

/* Adds an existing lesson from the lesson pool to a specific site. */
router.post('/addLessonSite', (req, res, next) => {
  /* TODO: create helper function to check for required parameters and call within each api call. */
  const requiredParameters = ['lesson_id', 'site_id'];
  let requiredParamError = false;
  const requiredParamErrors = [];
  requiredParameters.foreach(requiredParameter => {
    if (!req.body[requiredParameter]) {
      requiredParamError = true;
      requiredParamErrors.append(requiredParameter);
    }
  });
  if (requiredParamError) {
    return res.status(422).send({
      error: `Expected format: { lesson_site.lesson_id: <int>, lesson_site.site_id: <int>}. Missing the following properties: "${requiredParamErrors}"`
    });
  }

  return knex('lesson_site')
    .insert({ site_id: req.body.site_id, lesson_id: req.body.lesson_id })
    .then(() => {
      res.status(201).json({ title: req.body.title });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

/* Deletes an existing lesson from a specific site; The lesson remains in the
lesson pool. */
router.post('/deleteLessonSite', (req, res, next) => {
  const requiredParameters = ['lesson_id', 'site_id'];
  let requiredParamError = false;
  const requiredParamErrors = [];
  requiredParameters.foreach(requiredParameter => {
    if (!req.body[requiredParameter]) {
      requiredParamError = true;
      requiredParamErrors.append(requiredParameter);
    }
  });
  if (requiredParamError) {
    return res.status(422).send({
      error: `Expected format: { lesson_site.lesson_id: <int>, lesson_site.site_id: <int>}. Missing the following properties: "${requiredParamErrors}"`
    });
  }

  return knex('lesson_site')
    .where({ site_id: req.body.site_id, lesson_id: req.body.lesson_id })
    .del()
    .then(() => {
      res.status(201).json({ title: req.body.title });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
