const knex = require('../db/knex');

/* Get all lessons from the semester and site of that user. */
const getAllSemAndSiteLessons = async (req, res, next) => {
  const userid = req.query.uid;
  try {
    const siteid = await knex
      .select('site_id')
      .from('user_semester_site')
      .where('user_semester_site.user_id', userid);
    let data = await knex
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
      .where('site.id', siteid[0].site_id)
      .orderBy('date', 'asc');
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Get all lessons from other sites */
const getOtherSiteLessons = async (req, res, next) => {
  const userid = req.query.uid;
  try {
    const siteid = await knex
      .select('site_id')
      .from('user_semester_site')
      .where('user_semester_site.user_id', userid);

    const currentSiteLessonIds = await knex
      .select('lesson.id')
      .from('site')
      .join('lesson_site', 'lesson_site.site_id', 'site.id')
      .join('lesson', 'lesson_site.lesson_id', 'lesson.id')
      .where('site.id', siteid[0].site_id)
      .orderBy('date', 'asc');
    const currSiteLessonIds = currentSiteLessonIds.map(elem => {
      return elem.id;
    });

    const data = await knex
      .select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link')
      .from('lesson')
      .whereNotIn('id', currSiteLessonIds);

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Add a lesson to a specific site. */
const addLessonToSite = async (req, res, next) => {
  const userid = req.query.uid;
  try {
    const siteid = await knex
      .select('site_id')
      .from('user_semester_site')
      .where('user_semester_site.user_id', userid);

    await knex('lesson_site').insert({
      lesson_id: req.body.lesson_id,
      site_id: siteid[0].site_id,
      date: req.body.date,
    });

    const data = await knex
      .select('*')
      .from('lesson')
      .where('id', req.body.lesson_id)
      .first();

    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Deletes an existing lesson from a specific site; The lesson remains in the
     lesson pool. */
const deleteLessonFromSite = async (req, res, next) => {
  const userid = req.query.uid;
  try {
    const siteid = await knex
      .select('site_id')
      .from('user_semester_site')
      .where('user_semester_site.user_id', userid);

    const data = await knex('lesson_site')
      .where('site_id', siteid[0].site_id)
      .where('lesson_id', req.body.lesson_id)
      .del();
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Update notes on a site_lesson */
const update = async (req, res, next) => {
  const userid = req.body.userId;

  try {
    const siteid = await knex
      .select('site_id')
      .from('user_semester_site')
      .where('user_semester_site.user_id', userid);

    const data = await knex('lesson_site')
      .where('site_id', siteid[0].site_id)
      .where('lesson_id', req.body.lessonId)
      .update({ notes: req.body.editedNotes });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
module.exports = {
  getAllSemAndSiteLessons: getAllSemAndSiteLessons,
  getOtherSiteLessons: getOtherSiteLessons,
  addLessonToSite: addLessonToSite,
  deleteLessonFromSite: deleteLessonFromSite,
  update: update,
};
