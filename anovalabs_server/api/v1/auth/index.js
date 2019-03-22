const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const Account = require('../../../db/account');
//const Local = require('../../../db/local');
const User = require('../../../db/user');
//const ARP = require('../../../db/accountRolePermission');

require('dotenv').config();

router.get('/', (req, res) => {
  res.json({
    message: 'authenticate'
  });
});

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});

function validatorAccount(account) {
  const result = Joi.validate(
    { email: account.email.trim(), password: account.password.trim() },
    schema
  );
  return result;
}

router.post('/signup', (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  const accountId = uuidv4();
  console.log("heyo")
  console.log(validAccount.error);
  if (validAccount.error === null) {
    User.getOneByEmail(req.body.email.trim()).then(user => {
      if (!user) {
        // technique #2 of bycrypt
        bcrypt.hash(
          req.body.password.trim(),
          parseInt(process.env.SALT_ROUNDS, 10),
          (err, hash) => {
            // Store hash in your password DB.
            const newUser = {
              name: req.body.name.trim(),
              email: req.body.email.trim(),
              password: hash,
              grade: 1 // temporary value NEED TO CHANGE
              //account_id: accountId
            };
            User.create(newUser).then(retUser => {
              res.json({
                user: retUser
              });
            });
          }
        );
      } else {
        next(new Error('Email in use'));
      }
    });
  } else {
    next(new Error('Invalid Account'));
  }
});

router.post('/signup2', (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  console.log(validAccount.error);
  if (validAccount.error === null) {
    Account.getOneByEmail(req.body.email.trim()).then(account => {
      if (!account) {
        // technique #2 of bycrypt
        bcrypt.hash(
          req.body.password.trim(),
          parseInt(process.env.SALT_ROUNDS, 10),
          (err, hash) => {
            // Store hash in your password DB.
            const newAccount = {
              email: req.body.email.trim(),
              password: hash
            };
            Account.create(newAccount).then(accountId => {
              res.json({
                message: `defintely some #️⃣ ${accountId}`
              });
            });
          }
        );
      } else {
        next(new Error('Email in use'));
      }
    });
  } else {
    next(new Error('Invalid Account'));
  }
});

router.post('/login', (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  if (validAccount.error === null) {
    User.getOneByEmail(req.body.email.trim()).then(user => {
      if (user) {
        bcrypt.compare(req.body.password.trim(), user.password).then(result => {
          if (result) {
            const payload = {
              email: user.email,
              roles: 'this will be a list of roles from account_role table'
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: '2d'
              },
              (err, token) => {
                if (err) {
                  next(new Error('Invalid login'));
                } else {
                  res.json({
                    token
                  });
                }
              }
            );
          } else {
            next(new Error('Invalid login'));
          }
        });
      } else {
        next(new Error('Invalid login'));
      }
    });
  } else {
    res.status(401);
    next(new Error('Invalid Login'));
  }
});

router.post('/login2', (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  if (validAccount.error === null) {
    Account.getOneByEmail(req.body.email.trim()).then(account => {
      if (account) {
        bcrypt.compare(req.body.password.trim(), account.password).then(result => {
          if (result) {
            const payload = {
              email: account.email,
              roles: 'this will be a list of roles from account_role table'
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: '2d'
              },
              (err, token) => {
                if (err) {
                  next(new Error('Invalid login'));
                } else {
                  res.json({
                    token
                  });
                }
              }
            );
          } else {
            next(new Error('Invalid login'));
          }
        });
      } else {
        next(new Error('Invalid login'));
      }
    });
  } else {
    res.status(401);
    next(new Error('Invalid Login'));
  }
});

module.exports = router;
