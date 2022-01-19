const knex = require('../db/knex');

/* Returns all site names */
const index = async (req, res, next) => {
  try {
    const data = await knex.select('schoolName', 'id').from('site');
    return res.send(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Returns the current site of the user. */
const getCurrentUserSite = async (req, res, next) => {
  const userid = req.query.uid;
  try {
    const siteid = await knex
      .select('site_id')
      .from('user_semester_site')
      .where('user_semester_site.user_id', userid);

    const data = await knex
      .select('site.schoolName')
      .from('site')
      .where('site.id', siteid[0].site_id)
      .first();
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
/* Add user to a site. */
const addUserToSite = async (req, res, next) => {
  try {
    await knex('user_semester_site').insert({
      user_id: req.body.user_id,
      // semester: req.body.semester,
      site_id: req.body.site_id,
    });
    return res.status(201).json({
      user_id: req.body.user_id,
      // semester: req.body.semester,
      site_id: req.body.site_id,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  index: index,
  getCurrentUserSite: getCurrentUserSite,
  addUserToSite: addUserToSite,
};
