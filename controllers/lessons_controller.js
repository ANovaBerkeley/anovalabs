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
        'lesson.descriptionHTML',
        'lesson.resourcesHTML',
        'lesson.labHTML',
        'lesson.exitTicketHTML',
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
        descriptionHTML: req.body.editedDescriptionHTML,
        resourcesHTML: req.body.editedResourcesHTML,
        labHTML: req.body.editedLabHTML,
        exitTicketHTML: req.body.editedExitTicketHTML,
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

/* Retrieve mentor feedback for a lesson. */
const getFeedback = async (req, res, next) => {

}

// /* Submit mentor feedback for a lesson. */
// const submitFeedback = async (req, res, next) => {
//   const { lessonId } = req.body;
//   try {
//     const data = await knex('lesson')
//       .where({ id: lessonId })
//       .update({
//         feedback: req.body.feedback,
//       });
//     return res.status(200).send({ data });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// }

module.exports = {
  index: index,
  getLessonById: getLessonById,
  create: create,
  update: update,
  updatePage: updatePage,
  deleteLesson: deleteLesson,
};
