const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const auth = require('./api/v1/auth/index');
const authMiddleware = require('./api/v1/auth/middleware');

const lessons = require('./api/v1/routes/lessons');
const roster = require('./api/v1/routes/roster');
const profile = require('./api/v1/routes/profile');
const lessonSite = require('./api/v1/routes/lesson_site');
const accounts = require('./api/v1/routes/accounts');
const site = require('./api/v1/routes/site');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(authMiddleware.checkTokenSetAccount);
app.use('/api/v1/auth', auth);
app.use('/api/v1/profile', profile);
app.use('/api/v1/lessons', lessons);
app.use('/api/v1/roster', roster);
app.use('/api/v1/lesson_site', lessonSite);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/site', site);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});
module.exports = app;
