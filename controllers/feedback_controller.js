const knex = require('../db/knex');

/* Update feedback text and rating */
const updateFeedback = async (req, res, next) => {
  const { uid} = req.body;
  console.log(req.body);
  console.log(uid);
  try {
    const data = await knex('feedback')
      //.where({ lessonId: lessonId,  userId: userId})
      .where({user_id: uid})
      .update({
        text: req.body.text,
        rating: req.body.rating
        //rating: req.body.updatedRating
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
      .select(
        'feedback.id',
        'feedback.uid',
        'feedback.text',
        'feedback.rating',
        'feedback.mentor'
      )
      
      .from('feedback');
      //.where({ id: lessonId })
    console.log(data);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error});
  }
}

/* Submit mentor feedback for a lesson. */
const submitFeedback = async (req, res, next) => {

  const { feedback } = req.body;
  console.log(req.body)
  try {
    const data = await knex('feedback')
      .insert(req.body)
      .returning('id');
    return res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  updateFeedback: updateFeedback,
  getFeedback: getFeedback,
  submitFeedback: submitFeedback
};
