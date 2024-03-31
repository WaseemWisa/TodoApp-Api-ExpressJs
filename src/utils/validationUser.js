const {body} = require("express-validator");
const validateUser = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('password').notEmpty().withMessage('Password is required').trim().isLength({ min: 8, max:  16}).withMessage('Password at least 8 not be more than 16 character'),
  body('email').isEmail().withMessage('Write Valid Email').notEmpty().withMessage('Email Id is required').trim()
];


module.exports = validateUser;