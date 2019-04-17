const express = require('express');
const router = express.Router();
const Lesson = require('../../../db/lesson');
const db = require('../../../db');
const knex = require('../../../db/knex');

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

router.post('/add', (req, res, next) => {
    for (let requiredParameter of ['title', 'link', 'summary']) {
        if (!req.body[requiredParameter]) {
          return res
            .status(422)
            .send({ error: `Expected format: { title: <String>, link: <String>, summary: <String> }. You're missing a "${requiredParameter}" property.` });
        }
      }

    knex('lesson').insert(req.body)
    .then(function(data){
        res.status(201).json({title: req.body.title})
    })
    .catch(error => {
        res.status(500).json({error});
    })
  });

  router.post('/delete', (req, res, next) => {
      for (let requiredParameter of ['title']) {
          if (!req.body[requiredParameter]) {
            return res
              .status(422)
              .send({ error: `Expected format: { title: <String>}. You're missing a "${requiredParameter}" property.` });
          }
        }

      knex('lesson').where({title: req.body.title}).del()
      .then(function(data){
          res.status(201).json({title: req.body.title})
      })
      .catch(error => {
          res.status(500).json({error});
      })
    });

    router.post('/addLessonSite', (req, res, next) => {
        for (let requiredParameter of ['lesson_id', 'site_id']) {
            if (!req.body[requiredParameter]) {
              return res
                .status(422)
                .send({ error: `Expected format: { lesson_id: <int>, site_id: <int>}. You're missing a "${requiredParameter}" property.` });
            }
          }

        knex('lesson_site').insert({lesson_id: lesson_id, site_id: site_id})
        .then(function(data){
            res.status(201).json({title: req.body.title})
        })
        .catch(error => {
            res.status(500).json({error});
        })
      });

module.exports= router;
