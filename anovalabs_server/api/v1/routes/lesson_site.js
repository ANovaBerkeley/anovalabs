const express = require('express');
const router = express.Router();
const db = require('../../../db');
const knex = require('../../../db/knex');


//TODO: order by date, return date in readable format
router.get('/', function (req, res) {

	db.select()
		.from('lesson_site')

	.then(function(data){
		res.send(data);
	});
});

    router.post('/addLessonSite', (req, res, next) => {
        for (let requiredParameter of ['lesson_id', 'site_id']) {
            if (!(requiredParameter in req.body)) {
              return res
                .status(422)
                .send({ error: `${(req.body)} Expected format: { lesson_site.lesson_id: <int>, lesson_site.site_id: <int>}. You're missing a "${requiredParameter}" property.` });
            }
          }
        req.body = JSON.parse(req.body);
        knex('lesson_site').insert({site_id: req.body.site_id, lesson_id: req.body.lesson_id})
        .then(function(data){
            res.status(201).json({title: req.body.title})
        })
        .catch(error => {
            res.status(500).json({error});
        })
      });

      router.post('/deleteLessonSite', (req, res, next) => {
          for (let requiredParameter of ['lesson_id', 'site_id']) {
              if (!req.body[requiredParameter]) {
                return res
                  .status(422)
                  .send({ error: `Expected format: { lesson_site.lesson_id: <int>, lesson_site.site_id: <int>}. You're missing a "${requiredParameter}" property.` });
              }
            }

          knex('lesson_site').where({site_id: req.body.site_id, lesson_id: req.body.lesson_id}).del()
          .then(function(data){
              res.status(201).json({title: req.body.title})
          })
          .catch(error => {
              res.status(500).json({error});
          })
        });

module.exports= router;
