const express = require('express');
const apiRoute = require('./api/v1/auth');
const app = express();
app.use('/api/v1/auth', apiRoute);

// app.use('/api', apiRoute);
app.listen('3000');
