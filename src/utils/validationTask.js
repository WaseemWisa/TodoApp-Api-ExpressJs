const {body} = require("express-validator");
const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('owenerId').notEmpty().withMessage('Owner Id is required')
];


module.exports = validateTask;