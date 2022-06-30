const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getTasks = catchAsync(async (req, res, next) => {
  const task = await Task.findAll();

  res.status(200).json({
    status: 'success',
    message: 'successful result',
    task,
  });
});

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  const validateUser = await User.findOne({ where: { id: userId } });

  if (!validateUser || validateUser.status !== 'active') {
    return next(new AppError('user does not exist', 400));
  }
  const newTask = await Task.create({
    title,
    userId,
    limitDate,
    startDate: new Date(),
  });

  res.status(201).json({
    status: 'success',
    message: 'successful results',
    newTask,
  });
});

const checkTaskStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;

  if (!['active', 'completed', 'late', 'cancelled'].includes(status)) {
    return next(new AppError(`${status} is not a valid task status`, 400));
  }
  const tasks = await Task.findAll({ where: { status } });

  res.status(200).json({
    status: 'success',
    message: 'successful result',
    tasks,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const task = req.task;
  const { time } = req.body;

  if (new Date(time) < new Date(task.startDate)) {
    return next(new AppError('error of date, time', 400));
  }
  await task.update({
    finishDate: new Date(time),
    status: new Date(task.limitDate) >= new Date(time) ? 'completed' : 'late',
  });

  res.status(200).json({
    status: 'success',
    message: 'successful result',
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const task = req.task;

  await task.update({ status: 'cancelled' });

  res.status(204).json({
    status: 'success',
  });
});

module.exports = {
  getTasks,
  createTask,
  checkTaskStatus,
  updateTask,
  deleteTask,
};
