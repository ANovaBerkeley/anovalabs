const express = require('express');
const router = express.Router();
const Lesson = require('../../../db/lesson');
const db = require('../../../db');

router.get('/', function (req, res) {
  const userid = 1
  const semid = 1

  const siteid = db.select('site.id')
    .from('semester')
    .join('user_semester_site','user_semester_site.semester_id','semester.id')
    .join('site','user_semester_site.site_id','site.id')
    .where('user_semester_site.user_id',userid)
    .where('semester.id',semid)

  db.select('lesson.title', 'lesson.summary','lesson.link', 'lesson_site.date')
    .from('site')
    .join('lesson_site','lesson_site.site_id','site.id')
    .join('lesson','lesson_site.lesson_id','lesson.id')
    .where('site.id',siteid)

  .then(function(data){
    res.send(data);
  });
});

router.post('/', (req, res, next) => {
    Lesson.insert(req.body).returning('*').then(function(data) {
        res.send(data);
    })
  // validate account paramaters
  // Lesson.create(req.body).then(Lesson => {
  //   res.json(Lesson[0]);
  });

module.exports= router;
