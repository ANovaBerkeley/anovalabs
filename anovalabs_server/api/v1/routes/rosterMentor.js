const express = require('express');
const db = require('../../../db');

const router = express.Router();

/* Retrieve the list of mentors for a specific site. */
router.get('/', (req, res) => {
  const userid = 1;
  const roleType = 'mentor';

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

module.exports = router;