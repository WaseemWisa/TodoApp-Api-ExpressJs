const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const UserModel = require("../models/user.model");
const tokenModel = require('../models/token.model');

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const existsEmail = await UserModel.findOne({ email: req.body.email });
    if (existsEmail) {
      return res.status(400).json({ msg: "User Email exists", data: null });
    } else {
      const newUser = await UserModel.create(req.body);
      return res.status(201).json({ msg: "A New User Added Successfully", data: newUser });
    }
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await UserModel.findOne({ email, password }).select("-__v");
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
});

module.exports = {
  register,
  login,
};