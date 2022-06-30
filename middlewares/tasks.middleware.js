const { Task } = require('../models/task.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const taskExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({ where: { id } });

  if (!task || task.status !== 'active') {
    return next(new AppError('Task not found', 404));
  }

  req.task = task;

  next();
});

module.exports = { taskExists };
