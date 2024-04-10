const express = require('express');
const router = express.Router();

const userController = require("../controllers/user.controller");
const  validateUser  = require("../utils/validationUser");
const validateLogin = require('../utils/validationLogin');

router.post("/register", validateUser , userController.register)
router.get("/login", validateLogin , userController.login)

//


module.exports = router