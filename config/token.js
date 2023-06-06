const dotenv = require('dotenv').config();
module.exports = {
  accessToken: {
    secretKey: process.env.ACCESS_TOKEN_SECRET,
    expTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    type: 'access'
  },
  refreshToken: {
    secretKey: process.env.REFRESH_TOKEN_SECRET,
    expTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    type: 'refresh'
  }
}
