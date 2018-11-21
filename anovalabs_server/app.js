const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const auth = require('./api/auth/index');
const authMiddleware = require('./api/auth/middleware');

const lessons = require('./api/routes/lessons');
const accounts = require('./api/routes/accounts');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true
  })
);

app.use(authMiddleware.checkTokenSetAccount);
app.use('/auth', auth);
app.use('/api/v1/lessons', lessons);
app.use('/api/v1/accounts', accounts);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
module.exports = app;
