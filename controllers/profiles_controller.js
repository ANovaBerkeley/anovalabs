const knex = require('../db/knex');

/* Retrieve a user's profile based on their id. */
const getProfileById = async (req, res, next) => {
  const userid = req.query.uid;
  try {
    const data = await knex
      .select(
        'user.email',
        'user.picture',
        'user.candy',
        'user.name',
        'user.hobby',
        'user.fact',
        'user.notes',
        'user.role',
      )
      .from('user')
      .where('user.id', userid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
/* Update a user's profile. */
const update = async (req, res, next) => {
  try {
    const data = await knex('user')
      .where({ id: req.body.id })
      .update({
        hobby: req.body.hobby,
        candy: req.body.candy,
        fact: req.body.fact,
        notes: req.body.notes,
      });
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getProfileById: getProfileById,
  update: update,
};
