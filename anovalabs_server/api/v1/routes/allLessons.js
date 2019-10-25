const express = require('express');
const db = require('../../../db');

const router = express.Router();

/* TODO: move this to the lessons file. */

/* Retrieve all lessons from the lesson pool. */
router.get('/', (req, res) => {
  db.select('lesson.title', 'lesson.summary', 'lesson.link')
    .from('lesson')
    .then(data => {
      res.send(data);
    });
});

module.exports = router;
