const jwt = require("jsonwebtoken");
const TokenService = require('../services/TokenService');

const verifyToken = (req, res, next) => {
  const token = req.get('Authorization')
  const accessToken = token?.split(" ")[1];
  try {
    req.user = TokenService.verifyAccessToken(accessToken).payload;
  } catch (error) {
    return res.responseError(error)
  }
  next();
}

module.exports = verifyToken;