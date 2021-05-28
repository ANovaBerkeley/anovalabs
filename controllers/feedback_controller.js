const knex = require('../db/knex');

/* Update feedback text and rating */
const updateFeedback = async (req, res, next) => {
  const { uid, lessonId} = req.body;
  console.log(req.body);
  console.log(uid);
  console.log(lessonId);
  try {
    const data = await knex('feedback')
      //.where({ lessonId: lessonId,  userId: userId})
      .where({uid: uid})
      .where({lesson_id: lessonId})
      .update({
        text: req.body.text,
        gtext: req.body.gtext,
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
  const lessonId = req.query.lesson_id;
  const uid = req.query.uid;
  try {
    const data = await knex
      .select(
        'feedback.id',
        'feedback.uid',
        'feedback.lesson_id',
        'feedback.text',
        'feedback.gtext',
        'feedback.rating',
        'feedback.mentor'
      )
      
      .from('feedback')
      .where('feedback.uid', uid)
      .where('feedback.lesson_id', lessonId );
    console.log("RESULT");
    console.log(data);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({ error});
  }
}

/* Submit mentor feedback for a lesson. */
const submitFeedback = async (req, res, next) => {

  const { feedback } = req.body;
  console.log("REQUEST INFO")
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