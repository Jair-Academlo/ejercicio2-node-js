const express = require('express');
const {
  createUserValidators,
} = require('../middlewares/validators.middleware.js');
const { userExists } = require('../middlewares/users.middleware.js');

const {
  getAllUsers,
  createUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUserValidators, createUsers);
router.patch('/:id', userExists, updateUser);
router.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter: router };
