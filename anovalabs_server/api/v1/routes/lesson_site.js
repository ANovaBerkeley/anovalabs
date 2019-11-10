const express = require('express');
const router = express.Router();
const db = require('../../../db');
const knex = require('../../../db/knex');


router.get('/', function (req, res) {
	db.select()
		.from('lesson_site')
  	.then(function(data){
  		res.send(data);
  	});
  });

/* Get all lessons from the semester and site of that user.
TODO: replace hardcoded userid */
router.get('/all', function (req, res) {
  userid = 1
  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  db.select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link', 'lesson_site.date')
    .from('site')
    .join('lesson_site', 'lesson_site.site_id', 'site.id')
    .join('lesson', 'lesson_site.lesson_id', 'lesson.id')
    .where('site.id', siteid)
    .orderBy('date', 'asc')
    .then(data => {
      res.send(data);
    });
});

/* Get all lessons from other sites */
router.get('/all_but_current_site', (req, res) => {
  const userid = 1;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  const current_site_lesson_ids = db.select('lesson.id')
    .from('site')
    .join('lesson_site', 'lesson_site.site_id', 'site.id')
    .join('lesson', 'lesson_site.lesson_id', 'lesson.id')
    .where('site.id', siteid)
    .orderBy('date', 'asc');

  db.select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link')
    .from('lesson')
    .whereNotIn('id', current_site_lesson_ids)
    .then(data => {
      res.send(data);
    });
});

/* Add a lesson to a specific site. */
router.post('/add', (req, res, next) => {
  const userid = 1;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  for (let requiredParameter of ['lesson_id']) {
      if (!req.body[requiredParameter]) {
        return res
          .status(422)
          .send({ error: `Expected format: { lesson_id: <int>, site_id: <int>}. You're missing a "${requiredParameter}" property.` });
      }
    }

  if (req.body.date) {
    return knex('lesson_site')
      .insert({ lesson_id: req.body.lesson_id, site_id: siteid, date: req.body.date })
      .then(data => {
        res.status(201).json({ lesson_id: req.body.lesson_id });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  return knex('lesson_site')
    .insert({ lesson_id: req.body.lesson_id, site_id: siteid })
    .then(data => {
      res.status(201).json({ lesson_id: req.body.lesson_id });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

/* Deletes an existing lesson from a specific site; The lesson remains in the
lesson pool. */
router.post('/delete', (req, res, next) => {

  const userid = 1;
  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  return knex('lesson_site')
    .where('site_id', siteid)
    .where('lesson_id', req.body.lesson_id)
    .del()
    .then(data => {
      res.status(201).json({ id: req.body.id });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports= router;
