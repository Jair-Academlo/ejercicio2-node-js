const { User } = require('../models/user.model.js');
const { Task } = require('../models/task.model');
const { catchAsync } = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    include: Task,
  });

  res.status(200).json({
    status: 'success',
    message: 'successful result',
    users,
  });
});

const createUsers = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({ name, email, password });
  res.status(201).json({
    status: 'success',
    message: 'successful result, created user',
    newUser,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { name, email } = req.body;
  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'succeesful update',
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = req.body;
  await user.update({ status: 'disable' });

  res.status(200).json({
    status: 'success',
    message: 'status disable',
  });
});
module.exports = { getAllUsers, createUsers, updateUser, deleteUser };
