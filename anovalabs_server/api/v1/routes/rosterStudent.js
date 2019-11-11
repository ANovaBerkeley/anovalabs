const express = require('express');
const db = require('../../../db');
const knex = require('../../../db/knex');

const router = express.Router();

/* Retrieve the list of students for a specific site. */
router.get('/', (req, res) => {
  const userid = 1;
  const roleType = 'student';

  const siteid = db
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  db.select('name', 'email', 'picture', 'grade', 'bio', 'notes')
    .from('user_semester_site')
    .rightJoin('user', 'user.id', 'user_semester_site.user_id')
    .where('site_id', siteid)
    .where('role', roleType)

    .then(data => {
      res.send(data);
    });
});

/* Update a specific student profile */
router.post('/update', (req, res, next) => {
  for (let requiredParameter of ['name', 'email']) {
    if (!req.body[requiredParameter]) {
      return res
        .status(422)
        .send({ error: `Expected format: { title: <String>}. You're missing a "${requiredParameter}" property.` });
    }
  }

  knex('user')
  .where({ name: req.body.name })
  .update({ name: req.body.name })
  .update({ email: req.body.email })
  .update({ notes: req.body.notes })
  .then(data => {
    res.status(201).json({ name: req.body.name });
  })
  .catch(error => {
    console.log(req.body);
    res.status(500).json({ error });
  });
});

module.exports = router;
