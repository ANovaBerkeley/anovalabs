const express = require('express');

const router = express.Router();

const Accounts = require('../../../db/account');

// this is an old route class to be used as reference for moving database calls
// to db/

// need to create a validation function for id

// need to create a validation function for account

router.get('/', (req, res) => {
  Accounts.getAll().then(accounts => {
    res.json(accounts);
  });
});

router.get('/:id', (req, res, next) => {
  Accounts.getOneById(req.params.id).then(account => {
    if (account) {
      res.json(account);
    } else {
      res.status(404);
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  // validate account paramaters
  Accounts.create(req.body).then(Accounts => {
    res.json(Accounts[0]);
  });
});

router.put('/:id', (req, res, next) => {
  // check that contents are valid through another fn
  Accounts.update(req.params.id, req.body).then(Accounts => {
    res.json(Accounts[0]);
  });
});

router.delete('/:id', (req, res, next) => {
  Accounts.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
