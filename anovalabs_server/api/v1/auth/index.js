const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const User = require('../../../db/user');

require('dotenv').config();

router.post('/', (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
    }
    else {
      res.json({
        user: decoded,
        message: "authenticate"
      })
    }
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
  console.log(result);
  return result;
}

router.post('/signup', (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  // const accountId = uuidv4();
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
              role: req.body.role
              // account_id: accountId
            };
            User.create(newUser).then(retUser => {
              const payload = {
                id: retUser[0].id,
                email: retUser[0].email,
                roles: retUser[0].role,
                candy: ''
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
              id: user.id,
              email: user.email,
              roles: user.role
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: '2d'
              },
              (err, token) => {
                if (err) {
                  console.log("error jwt not created");
                  next(new Error('Invalid login'));
                } else {
                  res.json({
                    token
                  });
                }
              }
            );
          } else {
            res.status(401);
            next(new Error('Invalid login'));
          }
        });
      } else {
        res.status(401);
        next(new Error('Invalid login'));
      }
    });
  } else {
    res.status(401);
    next(new Error('Invalid Login'));
  }
});

module.exports = router;
