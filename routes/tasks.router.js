const express = require('express');
const { taskExists } = require('../middlewares/tasks.middleware');
const {
  createTaskValidators,
} = require('../middlewares/validators.middleware');
const {
  getTasks,
  createTask,
  checkTaskStatus,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTaskValidators, createTask);
router.get('/:status', checkTaskStatus);
router.patch('/:id', taskExists, updateTask);
router.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter: router };
