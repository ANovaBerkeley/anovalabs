const knex = require('../db/knex');

/* Get all lessons from the semester and site of that user. */
const getAllSemAndSiteLessons = (req, res, next) => {
  const userid = req.query.uid;

  const siteid = knex
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  knex
    .select(
      'lesson.id',
      'lesson.title',
      'lesson.summary',
      'lesson.link',
      'lesson_site.date',
      'lesson_site.notes',
    )
    .from('site')
    .join('lesson_site', 'lesson_site.site_id', 'site.id')
    .join('lesson', 'lesson_site.lesson_id', 'lesson.id')
    .where('site.id', siteid)
    .orderBy('date', 'asc')
    .then(data => {
      res.status(200).send(data);
    });
};
/* Get all lessons from other sites */
const getOtherSiteLessons = (req, res, next) => {
  const userid = req.query.uid;

  const siteid = knex
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  const currentSiteLessonIds = knex
    .select('lesson.id')
    .from('site')
    .join('lesson_site', 'lesson_site.site_id', 'site.id')
    .join('lesson', 'lesson_site.lesson_id', 'lesson.id')
    .where('site.id', siteid)
    .orderBy('date', 'asc');

  knex
    .select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link')
    .from('lesson')
    .whereNotIn('id', currentSiteLessonIds)
    .then(data => {
      res.status(200).send(data);
    });
};
/* Add a lesson to a specific site. */
const addLessonToSite = (req, res, next) => {
  const userid = req.query.uid;

  const siteid = knex
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  return knex('lesson_site')
    .insert({ lesson_id: req.body.lesson_id, site_id: siteid, date: req.body.date })
    .then(() =>
      knex
        .select('*')
        .from('lesson')
        .where('id', req.body.lesson_id)
        .first()
        .then(data => res.status(201).send(data)),
    )
    .catch(error => {
      res.status(500).json({ error });
    });
};
/* Deletes an existing lesson from a specific site; The lesson remains in the
     lesson pool. */
const deleteLessonFromSite = (req, res, next) => {
  const userid = req.query.uid;

  const siteid = knex
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  return knex('lesson_site')
    .where('site_id', siteid)
    .where('lesson_id', req.body.lesson_id)
    .del()
    .then(data => {
      return res.status(200).send({ data });
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};
/* Update notes on a site_lesson */
const update = (req, res, next) => {
  const userid = req.body.userId;

  const siteid = knex
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);
  knex('lesson_site')
    .where('site_id', siteid)
    .where('lesson_id', req.body.lessonId)
    .update({ notes: req.body.editedNotes })
    .then(data => {
      return res.status(200).json({ data });
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};
module.exports = {
  getAllSemAndSiteLessons: getAllSemAndSiteLessons,
  getOtherSiteLessons: getOtherSiteLessons,
  addLessonToSite: addLessonToSite,
  deleteLessonFromSite: deleteLessonFromSite,
  update: update,
};
