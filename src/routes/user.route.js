const express = require('express');
const router = express.Router();

const userController = require("../controllers/user.controller");
const  validateUser  = require("../utils/validationUser");
const validateLogin = require('../utils/validationLogin');

router.post("/add", validateUser , userController.addUser)
router.post("/login", validateLogin , userController.login)

//


module.exports = router