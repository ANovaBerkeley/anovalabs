const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();



/* Returns all site names */
router.get('/allSites', (req, res) => {
  db.select('schoolName', 'id')
    .from('site')
    .then(data => {
      res.send(data);
    });
});

router.get('/current', (req, res) => {
  const userid = req.query.uid;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  db.select('site.schoolName')
    .from('site')
    .where('site.id', siteid)
    .first()
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
