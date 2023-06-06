const jwt = require('jsonwebtoken');
const tokenConfig = require('../../config/token');
const { UnauthorizedException } = require('../exceptions');
const { httpErrorTransform } = require('../utils/httpCodes');
const RefreshTokenRepository = require('../repositories/RefreshTokenRepository')

class TokenService {
  /**
   * Generate token
   * @param {ObjectId} userId
   * @param {Moment} expires
   * @param {string} type
   * @param {string} [secret]
   * @returns {string}
   */
  generateToken = (UserId, UserType, JoinDate, type, secret, expires) => {
    const payload = { UserId, UserType, JoinDate, type };
    const options = { expiresIn: expires };
    return jwt.sign(payload, secret, options);
  };

  /**
   * Generate auth tokens
   * @param {User} user
   * @returns {Object}
   */
  generateAuthTokens = async (user) => {
    const accessToken = this.generateToken(user.id, user.type, user.created_at, tokenConfig.accessToken.type, tokenConfig.accessToken.secretKey, tokenConfig.accessToken.expTime);
    const refreshToken = this.generateToken(user.id, user.type, user.created_at, tokenConfig.refreshToken.type, tokenConfig.refreshToken.secretKey, tokenConfig.refreshToken.expTime);
    await RefreshTokenRepository.create(refreshToken, user.id)
    return {
      accessToken,
      refreshToken,
    }
  };

  /**
   * Verify access token
   * @param {string} token
   * @returns {Object}
   * @throws {Error}
   */
  verifyAccessToken = (token) => {
    try {
      if (!token) {
        throw new UnauthorizedException(httpErrorTransform.unauthenticated);
      }
      const payload = jwt.verify(token, tokenConfig.accessToken.secretKey);
      return { payload };
    } catch (err) {
      throw new UnauthorizedException(httpErrorTransform.token_invalid);
    }
  }

  /**
   * Verify refresh token
   * @param {string} token
   * @returns {Object}
   * @throws {Error}
   */
  verifyRefreshToken = (token) => {
    try {
      if (!token) {
        throw new UnauthorizedException(httpErrorTransform.unauthenticated);
      }
      const payload = jwt.verify(token, tokenConfig.refreshToken.secretKey);
      return payload;
    } catch (err) {
      throw new UnauthorizedException(httpErrorTransform.token_invalid);
    }
  }
}
module.exports = new TokenService()