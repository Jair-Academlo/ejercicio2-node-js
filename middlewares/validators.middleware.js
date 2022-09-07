const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/appError');

//AppError
const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map(error => error.msg)
      .join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

// express validators
const createUserValidators = [
  body('name').notEmpty().withMessage('the name is required'),
  body('email')
    .notEmpty()
    .withMessage('the email is required')
    .isEmail()
    .withMessage('invalid email'),
  body('password')
    .notEmpty()
    .withMessage('the pass is required')
    .isLength({ min: 8 })
    .withMessage('the pass does not less 8 characters')
    .isAlphanumeric()
    .withMessage('the pass must have numbers'),
  checkResult,
];

const createTaskValidators = [
  body('title').notEmpty().withMessage('the title is required'),
  body('userId')
    .notEmpty()
    .withMessage('id of the task is required')
    .isNumeric()
    .withMessage('id must be a number'),
  body('limitDate')
    .notEmpty()
    .withMessage('the date is required')
    .matches(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    .withMessage('the date format must be  YYYY-MM-DD HH:mm:ss'),
  checkResult,
];

module.exports = { createUserValidators, createTaskValidators };
