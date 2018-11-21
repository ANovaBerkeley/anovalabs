const express = require('express');
const router = express.Router();
const validator = require('validator');
const Account = require('../../db/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', (req, res) => {
  res.json({
    message: 'wow'
  });
});

function validatorAccount(account) {
  const validEmail = validator.isEmail(account.email.trim());
  const validPassword = validator.isLength(account.password.trim(), {
    min: 10,
    max: undefined
  });
  return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  if (validAccount) {
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
  if (validAccount) {
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
    next(new Error('Invalid login'));
  }
});

router.post('/cookie', (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  if (validAccount) {
    Account.getOneByEmail(req.body.email.trim()).then(account => {
      if (account) {
        bcrypt.compare(req.body.password.trim(), account.password).then(result => {
          if (result) {
            const isSecure = req.app.get('env') != 'development';
            res.cookie('account_id', account.accountId, {
              httpOnly: true,
              secure: isSecure,
              signed: true
            });
            res.json({
              message: 'its lit'
            });
          } else {
            next(new Error('Invalid login'));
          }
        });
      } else {
        next(new Error('Invalid login'));
      }
    });
  } else {
    next(new Error('Invalid login'));
  }
});

module.exports = router;
