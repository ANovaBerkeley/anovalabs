const express = require('express');
const router = express.Router();
const anovalabsdbRoute = require('./anovalabsdb');
const rosterMentorRoute = require('./rosterMentor');
const rosterStudentRoute = require('./rosterStudent');

router.use('/anovalabsdb', anovalabsdbRoute);
router.use('/rosterMentor', rosterMentorRoute);
router.use('/rosterStudent', rosterStudentRoute);

module.exports = router;
