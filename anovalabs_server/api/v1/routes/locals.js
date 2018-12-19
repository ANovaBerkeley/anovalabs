const express = require('express');

const router = express.Router();

const Locals = require('../../../db/local');

// need to create a validation function for id

// need to create a validation function for local

router.get('/', (req, res) => {
  Locals.getAll().then(Locals => {
    res.json(Locals);
  });
});

router.get('/:id', (req, res, next) => {
  Locals.getOneById(req.params.id).then(local => {
    if (local) {
      console.log("we're good!");
      console.log(local);
      res.json(local);
    } else {
      console.log('we not good');
      res.status(404);
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  // validate local paramaters
  Locals.create(req.body).then(locals => {
    res.json(locals[0]);
  });
});

router.put('/:id', (req, res, next) => {
  // check that contents are valid through another fn
  Locals.update(req.params.id, req.body).then(locals => {
    res.json(locals[0]);
  });
});

router.delete('/:id', (req, res, next) => {
  Locals.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
