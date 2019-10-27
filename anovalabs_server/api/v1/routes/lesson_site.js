const express = require('express');
const router = express.Router();
const db = require('../../../db');
const knex = require('../../../db/knex');


//TODO: order by date, return date in readable format
router.get('/', function (req, res) {

	db.select()
		.from('lesson_site')

	.then(function(data){
		res.send(data);
	});
});


/* Get all lessons from the semester and site of that user.
TODO: replace hardcoded userid */

router.get('/all', (req, res) => {
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


/* TODO: Add a lesson to a specific site. */
router.post('/addLessonSite', (req, res, next) => {
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
    knex('lesson_site')
      .insert({ lesson_id: req.body.lesson_id, site_id: siteid, date: req.body.date })
      .then(data => {
        res.status(201).json({ lesson_id: req.body.lesson_id });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  } else {
    knex('lesson_site')
      .insert({ lesson_id: req.body.lesson_id, site_id: siteid })
      .then(data => {
        res.status(201).json({ lesson_id: req.body.lesson_id });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }


});

/* Deletes an existing lesson from a specific site; The lesson remains in the
lesson pool. UNVERIFIED */
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


module.exports= router;
