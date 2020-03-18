const knex = require('../db/knex');

/* Retrieve the list of students for a specific site. */
const getUsersBySite = (req, res) => {
  const userid = req.query.uid;
  const roleType = req.query.roleToRetrieve;

  const siteid = knex
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  knex
    .select('user.id', 'name', 'email', 'picture', 'notes')
    .from('user_semester_site')
    .rightJoin('user', 'user.id', 'user_semester_site.user_id')
    .where('site_id', siteid)
    .where('role', roleType)
    .then(data => {
      res.status(200).send(data);
    });
};
/* Update a specific student profile */
const update = (req, res) => {
  knex('user')
    .where({ id: req.body.userId })
    .update({ notes: req.body.editedNotes })
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = {
  getUsersBySite: getUsersBySite,
  update: update,
};
