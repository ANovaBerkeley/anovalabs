const knex = require('../db/knex');

/* Class interacting with the lesson pool. */

/* Retrieve all lessons from the lesson pool. */
const index = (req, res, next) => {
  knex
    .select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link')
    .from('lesson')
    .then(data => {
      res.status(200).send(data);
    });
};
/* Add a lesson to the lesson pool. */
const create = (req, res, next) => {
  knex('lesson')
    .insert(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};
/* Update a lesson details */
const update = (req, res, next) => {
  knex('lesson')
    .where({ id: req.body.lessonId })
    .update({
      title: req.body.editedTitle,
      summary: req.body.editedSummary,
      link: req.body.editedLink,
    })
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};
/* Delete a lesson from the lesson pool. */
const deleteLesson = (req, res, next) => {
  knex('lesson')
    .where({ id: req.body.id })
    .del()
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = {
  index: index,
  create: create,
  update: update,
  deleteLesson: deleteLesson,
};
