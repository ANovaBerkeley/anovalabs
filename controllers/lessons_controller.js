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
/* Add a lesson to the lesson pool. */
const create = async (req, res, next) => {
  try {
    await knex('lesson').insert(req.body);
    return res.status(201).send({ title: req.body.title });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Update a lesson details */
const update = async (req, res, next) => {
  const { lessonId } = req.body;
  try {
    const data = await knex('lesson')
      .where({ id: lessonId })
      .update({
        title: req.body.editedTitle,
        summary: req.body.editedSummary,
        link: req.body.editedLink,
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
  create: create,
  update: update,
  deleteLesson: deleteLesson,
};
