const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  try {
    return jwt.sign({payload}, process.env.JWT_ACCESS_KEY, {expiresIn: "1d"});
  } catch (error) {
    console.error("Error generating access token:", error);
  }
}

const generateRefreshToken = (payload) => {
  try {
    return jwt.sign({payload}, process.env.JWT_REFRESH_KEY, {expiresIn: "1d"});
  } catch (error) {
    console.error("Error generating refresh token:", error);
  }
}


module.exports = {
  generateAccessToken,
  generateRefreshToken
}