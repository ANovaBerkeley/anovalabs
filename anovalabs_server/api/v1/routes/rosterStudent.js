const express = require('express');
const db = require('../../../db');

const router = express.Router();

/* Retrieve the list of students for a specific site. */
router.get('/', (req, res) => {
  const userid = 1;
  const semesterid = 1;
  const roleType = 'student';

  const siteid = db
    .select('user_semester_site.site_id')
    .from('user_semester_site')
    .where('user_semester_site.semester_id', userid)
    .where('user_semester_site.semester_id', semesterid);

  db.select('name', 'email', 'picture', 'grade', 'bio', 'notes')
    .from('user_semester_site')
    .rightJoin('user_role', 'user_role.user_id', 'user_semester_site.user_id')
    .rightJoin('role', 'role.id', 'role_id')
    .rightJoin('user', 'user.id', 'user_semester_site.user_id')
    .where('user_semester_site.site_id', siteid)
    .where('user_semester_site.semester_id', semesterid)
    .where('roleName', roleType)
    .then(data => {
      res.send(data);
    });
});

module.exports = router;
