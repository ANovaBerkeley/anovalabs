const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../db/user');
require('dotenv').config();

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().regex(/[a-zA-Z0-9]/),
});

function validatorAccount(account) {
  const result = Joi.validate(
    { email: account.email.trim(), password: account.password.trim() },
    schema,
  );
  return result;
}

async function verify(client, token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  // const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return payload;
}

const checkAuth = (req, res) => {
  const { anovaToken } = req.body;

  jwt.verify(anovaToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
    } else {
      console.log(decoded);
      res.json({
        user: decoded,
        message: 'authenticate',
      });
    }
  });
};

const login = (req, res, next) => {
  const { googleToken } = req.body;

  const client = new OAuth2Client(process.env.CLIENT_ID);

  verify(client, googleToken).then(verifiedUser => {
    const { email, email_verified } = verifiedUser;

    if (!email_verified) {
      console.error('Email not verified');
      next(new Error('Email not verified'));
    }

    User.getOneByEmail(email.trim()).then(user => {
      if (user) {
        const payload = {
          id: user.id,
          email: user.email,
          roles: user.role,
          candy: user.candy,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: '2d',
          },
          (err, token) => {
            if (err) {
              console.log('error jwt not created');
              next(new Error('Invalid login'));
            } else {
              res.json({
                token,
              });
            }
          },
        );
      } else {
        res.status(401);
        next(new Error('Invalid login'));
      }
    });
  });
};

const signup = (req, res, next) => {
  const { googleToken, role, semesters } = req.body;

  const client = new OAuth2Client(process.env.CLIENT_ID);

  verify(client, googleToken)
    .then(verifiedUser => {
      const { name, email, email_verified } = verifiedUser;

      if (!email_verified) {
        console.error('Email not verified');
        next(new Error('Email not verified'));
      }

      User.getOneByEmail(email.trim()).then(user => {
        if (!user) {
          const newUser = {
            name: name.trim(),
            email: email.trim(),
            role: role,
            studentSemesters: JSON.stringify(semesters),
          };
          User.create(newUser).then(retUser => {
            const payload = {
              id: retUser[0].id,
              email: retUser[0].email,
              roles: retUser[0].role,
              candy: '',
            };

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: '2d',
              },
              (err, token) => {
                if (err) {
                  next(new Error('Trouble creating token'));
                } else {
                  res.json({
                    token,
                  });
                }
              },
            );
          });
        } else {
          console.error('Email in use');
          next(new Error('Email in use'));
        }
      });
    })
    .catch(console.error);
};

module.exports = { checkAuth: checkAuth, login: login, signup: signup };
