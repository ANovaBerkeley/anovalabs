const express = require('express');

const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../../../db/account');
const Local = require('../../../db/local');
const ARP = require('../../../db/accountRolePermission');

require('dotenv').config();

router.get('/', (req, res) => {
  res.json({
    message: 'authenticate'
  });
});

const schemaSignUp = Joi.object().keys({
  firstName: Joi.string()
    .min(1)
    .required(),
  lastName: Joi.string()
    .min(1)
    .required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  role: Joi.string().required()
});

const schemaLogin = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});

function validatorAccount(local) {
  const result = Joi.validate(
    {
      email: local.email.trim(),
      password: local.password.trim(),
      firstName: local.firstName.trim(),
      lastName: local.lastName.trim(),
      role: local.role.trim()
    },
    schemaSignUp
  );
  return result;
}
function validatorLogin(local) {
  const result = Joi.validate(
    {
      email: local.email.trim(),
      password: local.password.trim()
    },
    schemaLogin
  );
  return result;
}

router.post('/signup', (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  console.log(validAccount.error);
  if (validAccount.error === null) {
    Local.getOneByEmail(req.body.email.trim()).then(local => {
      if (!local) {
        // technique #2 of bycrypt
        bcrypt.hash(
          req.body.password.trim(),
          parseInt(process.env.SALT_ROUNDS, 10),
          (err, hash) => {
            // Store hash in your password DB.
            const newAccount = {
              first_name: req.body.firstName.trim(),
              last_name: req.body.lastName.trim(),
              email: req.body.email.trim(),
              authentication_id: 1
            };
            Account.create(newAccount).then(accountId => {
              // Store hash in your password DB.
              const newLocal = {
                email: req.body.email.trim(),
                password: hash,
                account_id: accountId[0].id
              };
              Local.create(newLocal).then(localId => {
                const role = req.body.role.trim();
                res.json({
                  id: localId.account_id
                });
                if (role === 'Site Leader') {
                  const newAccountRolePermission = {
                    account_id: localId[0].account_id,
                    role_id: 2,
                    permission_id: 2
                  };
                  ARP.create(newAccountRolePermission).then(arpItem => {
                    console.log('Permissions created');
                  });
                } else if (role === 'Mentor') {
                  const newAccountRolePermission = {
                    account_id: localId[0].account_id,
                    role_id: 3,
                    permission_id: 3
                  };
                  ARP.create(newAccountRolePermission).then(arpItem => {
                    console.log('Permissions created');
                  });
                } else if (role === 'Student') {
                  const newAccountRolePermission = {
                    account_id: localId[0].account_id,
                    role_id: 4,
                    permission_id: 4
                  };
                  ARP.create(newAccountRolePermission).then(arpItem => {
                    console.log('Permissions created');
                  });
                } else {
                  next(new Error('Invalid Account'));
                }
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
  const validAccount = validatorLogin(req.body);
  if (validAccount.error === null) {
    Local.getOneByEmail(req.body.email.trim()).then(local => {
      if (local) {
        bcrypt.compare(req.body.password.trim(), local.password).then(result => {
          if (result) {
            const payload = {
              user: local.account_id,
              message: `ANova Labs Member ${local.account_id}`
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
