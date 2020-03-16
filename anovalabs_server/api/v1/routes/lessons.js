const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* Class interacting with the lesson pool. */

/* Retrieve all lessons from the lesson pool. */
router.get('/all', (req, res) => {
  db.select('lesson.id', 'lesson.title', 'lesson.summary', 'lesson.link')
    .from('lesson')
    .then(data => {
      res.send(data);
    });
});

/* Add a lesson to the lesson pool. */
router.post('/add', (req, res) => {
  knex('lesson')
    .insert(req.body)
    .returning('id')
    .then(data => {
      res.send({data});
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

/* Update a lesson details */
router.post('/update', (req, res) => {
  console.log(req.body);
  knex('lesson')
      .where({id: req.body.lessonId})
      .update({ title: req.body.editedTitle, summary: req.body.editedSummary, link: req.body.editedLink })
      .then(data => {
        res.send({data});
      })
      .catch(error => {
        res.status(500).json({ error });
      });

});


/* Delete a lesson from the lesson pool. */
router.post('/delete', (req, res) => {
  knex('lesson')
    .where({ id: req.body.id })
    .del()
    .then(data => {
      res.send({data});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

module.exports = router;
