const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/', function (req, res) {

  db.select('lesson.title', 'lesson.summary', 'lesson.link')
    .from('lesson')


  .then(function(data){
    res.send(data);
  });
});

module.exports= router;
