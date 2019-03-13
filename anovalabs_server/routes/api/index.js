const express = require('express');
const router = express.Router();
const anovalabsdbRoute = require('./anovalabsdb');

router.use('/anovalabsdb', anovalabsdbRoute);
 
module.exports = router;