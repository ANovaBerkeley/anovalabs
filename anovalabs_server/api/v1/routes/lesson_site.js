const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* Unused */
router.get('/', (req, res) => {
  db.select()
    .from('lesson_site')
    .then(data => {
      res.send(data);
    });
});

/* Get all lessons from the semester and site of that user. */
router.get('/all', (req, res) => {
  const userid = req.query.uid;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  db.select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link', 'lesson_site.date', 'lesson_site.notes')
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
  const userid = req.query.uid;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  const currentSiteLessonIds = db
    .select('lesson.id')
    .from('site')
    .join('lesson_site', 'lesson_site.site_id', 'site.id')
    .join('lesson', 'lesson_site.lesson_id', 'lesson.id')
    .where('site.id', siteid)
    .orderBy('date', 'asc');

  db.select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link')
    .from('lesson')
    .whereNotIn('id', currentSiteLessonIds)
    .then(data => {
      res.send(data);
    });
});

/* Add a lesson to a specific site. */
router.post('/add', (req, res) => {
  const userid = req.query.uid;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  return knex('lesson_site')
    .insert({ lesson_id: req.body.lesson_id, site_id: siteid, date: req.body.date })
    .then(() =>
      db
        .select('*')
        .from('lesson')
        .where('id', req.body.lesson_id)
        .first()
        .then(data => res.send(data))
    )
    .catch(error => {
      res.status(500).json({ error });
    });
});

/* Deletes an existing lesson from a specific site; The lesson remains in the
lesson pool. */
router.post('/delete', (req, res) => {
  const userid = req.query.uid;
  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  return knex('lesson_site')
    .where('site_id', siteid)
    .where('lesson_id', req.body.lesson_id)
    .del()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});


/* Update notes on a site_lesson */
router.post('/update', (req, res) => {
  const userid = req.body.userId;
  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  knex('lesson_site')
      .where('site_id', siteid)
      .where('lesson_id', req.body.lessonId)
      .update({ notes: req.body.editedNotes })
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.status(500).json({ error });
      });

});
module.exports = router;
