const tokenModel = require("../models/token.model");
const jwt = require("jsonwebtoken");
const { generateAccessToken , generateRefreshToken } = require("../utils/generateTokens");
const refreshToken = async (req , res) => {
  const {token} = req.body;
  const oldRefreshToken = await tokenModel.findOne({refreshToken: token});
  if(!oldRefreshToken) return  res.status(401).json({status: 401, msg: "You need to login"});
  if(oldRefreshToken) {
    jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_KEY ,  async (err , user) => {
      try {
        const newGenerateAccessToken= generateAccessToken(user);
        const newRefreshAccessToken= generateRefreshToken(user);
        await tokenModel.deleteOne(oldRefreshToken);
        await tokenModel.create({refreshToken: newRefreshAccessToken});
        res.status(201).json({
          msg: "Success",
          data: {
            accessToken: newGenerateAccessToken,
            refreshToken: newRefreshAccessToken,
          },
        })
      } catch (error) {
        console.log(error);
      }
    })
  }

}

module.exports = {
  refreshToken
}