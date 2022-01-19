const knex = require('../db/knex');

/* Retrieve the list of students for a specific site. */
const getUsersBySite = async (req, res) => {
  const userid = req.query.uid;
  const roleType = req.query.roleToRetrieve;
  try {
    const siteid = await knex
      .select('site_id')
      .from('user_semester_site')
      .where('user_semester_site.user_id', userid);
    const data = await knex
      .select(
        'user.id',
        'name',
        'email',
        'picture',
        'candy',
        'hobby',
        'fact',
        'notes',
        'studentSemesters',
      )
      .from('user_semester_site')
      .rightJoin('user', 'user.id', 'user_semester_site.user_id')
      .where('site_id', siteid[0].site_id)
      .where('role', roleType);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

/* Update a specific student profile */
const update = async (req, res) => {
  try {
    const data = await knex('user')
      .where({ id: req.body.id })
      .update({
        notes: req.body.updateNotes,
        studentSemesters: JSON.stringify(req.body.editedStudentSemesters),
      });
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  getUsersBySite: getUsersBySite,
  update: update,
};
