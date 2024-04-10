const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { generateAccessToken , generateRefreshToken } = require("../utils/generateTokens");
const UserModel = require("../models/user.model");
const tokenModel = require('../models/token.model');


const register = async (req , res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  } else {
    try {
      const newUser = await UserModel.create(req.body);
      res.status(201).json({msg: "A New User Added Successfully", data: newUser});
    } catch (error) {
      console.log(error);
    }
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await UserModel.findOne({ email, password }).populate("tasks");
    console.log(user.tasks)
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await tokenModel.create({ refreshToken });

    return res.status(200).json({
      msg: "User Found",
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};





module.exports = {
  register,
  login,
}