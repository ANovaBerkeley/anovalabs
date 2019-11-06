const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

router.get('/', (req, res) => {
  db.select()
    .from('lesson_site')
    .then(data => {
      res.send(data);
    });
});

router.get('/allSites', (req, res) => {
  db.select('schoolName')
    .from('site')
    .then(data => {
      res.send(data);
    });
});


/* Add user to user semester site. */
router.post('/addUserSemSite', (req, res, next) => {


  for (let requiredParameter of ['user_id', 'semester', 'site_id']) {
      if (!req.body[requiredParameter]) {
        return res
          .status(422)
          .send({ error: `requiredParamError` });
      }
    }

  return knex('user_semester_site')
    .insert({ user_id: req.body.user_id, semester: req.body.semester, site_id: req.body.site_id})
    .then(data => {
      res.status(201).json({user_id: req.body.user_id, semester: req.body.semester, site_id: req.body.site_id});
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});



/* Get all lessons from the semester and site of that user.
TODO: replace hardcoded userid
TODO: return date in readable format */

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
    .orderBy('date', 'asc')
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
lesson pool. UNVERIFIED */
router.post('/delete', (req, res, next) => {
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
      error: `Missing the following properties: "${requiredParamErrors}"`
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
