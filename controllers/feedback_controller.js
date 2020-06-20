const knex = require('../db/knex');

/* Update feedback text and rating */
const updateFeedback = async (req, res, next) => {
  const { userId, lessonId } = req.body;
  try {
    const data = await knex('feedback')
      .where({ lessonId: lessonId,  userId: userId})
      .update({
        text: req.body.updatedText,
        rating: req.body.updatedRating
      });
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


/* Retrieve all feedback for a lesson. */
const getFeedback = async (req, res, next) => {
  const lessonId = req.query.lessonId;
  try {
    const data = await knex
      .select('feedback.body')
      .where({ id: lessonId })
      .from('feedback');
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error});
  }
}

/* Submit mentor feedback for a lesson. */
const submitFeedback = async (req, res, next) => {
  const { feedback } = req.body;
  try {
    const data = await knex('feedback')
      .insert(req.body)
      .returning('id');
    return res.status(201).send({ title: req.body.title, id: data[0] });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  updateFeedback: updateFeedback,
  getFeedback: getFeedback,
  submitFeedback: submitFeedback
};
