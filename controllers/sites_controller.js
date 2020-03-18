const knex = require('../db/knex');

/* Returns all site names */
const index = (req, res, next) => {
  knex
    .select('schoolName', 'id')
    .from('site')
    .then(data => {
      res.send(data);
    });
};
/* Returns the current site of the user. */
const getCurrentUserSite = (req, res, next) => {
  const userid = req.query.uid;

  const siteid = knex
    .select('site_id')
    .from('user_semester_site')
    .where('user_semester_site.user_id', userid);

  knex
    .select('site.schoolName')
    .from('site')
    .where('site.id', siteid)
    .first()
    .then(data => {
      res.send(data);
    });
};
/* Add user to a site + semester. */
const addUserToSemSite = (req, res, next) => {
  knex('user_semester_site')
    .insert({
      user_id: req.body.user_id,
      semester: req.body.semester,
      site_id: req.body.site_id,
    })
    .then(() => {
      res.status(201).json({
        user_id: req.body.user_id,
        semester: req.body.semester,
        site_id: req.body.site_id,
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = {
  index: index,
  getCurrentUserSite: getCurrentUserSite,
  addUserToSemSite: addUserToSemSite,
};
