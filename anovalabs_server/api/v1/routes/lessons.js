const express = require('express');

const router = express.Router();

const Lessons = require('../../../db/lesson');

// need to create a validation function for id

// need to create a validation function for lesson

router.get('/', (req, res) => {
  Lessons.getAll().then(lessons => {
    res.json(lessons);
  });
});

router.get('/:id', (req, res, next) => {
  Lessons.getOne(req.params.id).then(lesson => {
    if (lesson) {
      res.json(lesson);
    } else {
      res.status(404);
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  // validateLesson paramaters
  Lessons.create(req.body).then(lessons => {
    res.json(lessons[0]);
  });
});

router.put('/:id', (req, res, next) => {
  // check that contents are valid through another fn
  Lessons.update(req.params.id, req.body).then(lessons => {
    res.json(lessons[0]);
  });
});

router.delete('/:id', (req, res, next) => {
  Lessons.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
