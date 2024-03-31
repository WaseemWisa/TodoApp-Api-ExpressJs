const { validationResult } = require('express-validator');
const UserModel = require("../models/user.model");
const { generateAccessToken , generateRefreshToken } = require("../utils/generateTokens");
const tokenModel = require('../models/token.model');


const addUser = async (req , res) => {
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


const login = async (req , res) => {
  const {email , password} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  } else {
    try {
      const userFound = await UserModel.find({email});
      const user = userFound.filter((u) => u.email === email && u.password === password);
      if (!user) {
        return res.status(400).json({ msg: "User Not Found" }); 
      } else {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await tokenModel.create({refreshToken: refreshToken});
        return res.status(200).json({ msg: "User Found", data: {
          user,
          tokens: {
            accessToken,
            refreshToken,
          }
        }}); 
      }
    } catch (error) {
      console.log(error);
    }
  }
}



module.exports = {
  addUser,
  login
}