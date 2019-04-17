const express = require('express');
const router = express.Router();
const db = require('../../../db');
const knex = require('../../../db/knex');

router.get('/:id', function (req, res) {
	const userid = req.params.id;

	db.select('user.email', 'user.picture', 'user.grade', 'user.name', 'user.bio', 'user.notes')
		.from('user')
		.where('user.id', userid)


	.then(function(data){
		res.send(data);
	});
});
router.post('/update', (req, res, next) => {
    for (let requiredParameter of ['notes', 'id']) {
        if (!req.body[requiredParameter]) {
          return res
            .status(422)
            .send({ error: `Expected format: { notes: <String> , id: <int>}. You're missing a "${requiredParameter}" property.` });
        }
      }
    knex('user').where({id: req.body.id}).update({notes: req.body.notes})
    .then(function(data){
        res.status(201).json({title: req.body.title})
    })
    .catch(error => {
        res.status(500).json({error});
    })
  });
module.exports= router;
