const knex = require('../db/knex');

/* Class interacting with the lesson pool. */

/* Retrieve all lessons from the lesson pool. */
const index = async (req, res, next) => {
  try {
    const data = await knex
      .select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link')
      .from('lesson');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
/* Retrieve lesson by id. */
const getLessonById = async (req, res, next) => {
  const lessonId = req.query.id;
  console.log(lessonId);
  try {
    const data = await knex
      .select(
        'lesson.id',
        'lesson.title',
        'lesson.summary',
        'lesson.link',
        'lesson.description_state',
        'lesson.resources_state',
        'lesson.lab_state',
        'lesson.exit_ticket_state',
      )
      .from('lesson')
      .where('lesson.id', lessonId);
    console.log(data);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Add a lesson to the lesson pool. */
const create = async (req, res, next) => {
  try {
    const data = await knex('lesson')
      .insert(req.body)
      .returning('id');
    return res.status(201).send({ title: req.body.title, id: data[0] });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Update lesson details */
const update = async (req, res, next) => {
  const { id } = req.body;
  try {
    const data = await knex('lesson')
      .where({ id: id })
      .update({
        title: req.body.editedTitle,
        summary: req.body.editedSummary,
      });
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/* Update content on lesson page */
const updatePage = async (req, res, next) => {
  const { lessonId } = req.body;
  console.log('IN UPDATE PAGE');
  console.log(req.body);
  try {
    const data = await knex('lesson')
      .where({ id: lessonId })
      .update({
        description_state: req.body.editedDescriptionState,
        resources_state: req.body.editedResourcesState,
        lab_state: req.body.editedLabState,
        exit_ticket_state: req.body.editedExitTicketState,
      });
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/* Delete a lesson from the lesson pool. */
const deleteLesson = async (req, res, next) => {
  const { id } = req.body;
  try {
    const data = await knex('lesson')
      .where({ id: id })
      .del();
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  index: index,
  getLessonById: getLessonById,
  create: create,
  update: update,
  updatePage: updatePage,
  deleteLesson: deleteLesson,
};
