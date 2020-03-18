const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* Retrieve the list of students for a specific site. */
router.get('/', (req, res) => {
  const userid = req.query.uid;
  const roleType = req.query.roleToRetrieve;

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  db.select('user.id', 'name', 'email', 'picture', 'notes')
    .from('user_semester_site')
    .rightJoin('user', 'user.id', 'user_semester_site.user_id')
    .where('site_id', siteid)
    .where('role', roleType)
    .then(data => {
      res.send(data);
    });
});

/* Update a specific student profile */
router.post('/update', (req, res) => {
  knex('user')
    .where({ id: req.body.userId })
    .update({ notes: req.body.editedNotes })
    .then(data => {
      res.send({ data });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
