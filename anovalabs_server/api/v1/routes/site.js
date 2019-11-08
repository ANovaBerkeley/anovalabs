const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();



/* Returns all sites */
router.get('/allSites', (req, res) => {
  db.select('schoolName')
    .from('site')
    .then(data => {
      res.send(data);
    });
});


/* Add user to user semester site. */
router.post('/addUserSemSite', (req, res, next) => {


  for (let requiredParameter of ['user_id', 'semester', 'site_id']) {
      if (!req.body[requiredParameter]) {
        return res
          .status(422)
          .send({ error: `requiredParamError` });
      }
    }

  return knex('user_semester_site')
    .insert({ user_id: req.body.user_id, semester: req.body.semester, site_id: req.body.site_id})
    .then(data => {
      res.status(201).json({user_id: req.body.user_id, semester: req.body.semester, site_id: req.body.site_id});
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;