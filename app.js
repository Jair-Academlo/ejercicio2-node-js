const express = require('express');
const { usersRouter } = require('./routes/users.router');
const { tasksRouter } = require('./routes/tasks.router');
const { globalErrorHandler } = require('./controllers/error.controller');
const { AppError } = require('./utils/appError');
const colors = require('colors');
require('dotenv').config();

const app = express();

app.set('PORT', process.env.PORT || 5000);

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = { app, colors };
