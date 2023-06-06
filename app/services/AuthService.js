const UserRepository = require('../repositories/UserRepository');
const TokenService = require('./TokenService');
const RefreshTokenRepository = require('../repositories/RefreshTokenRepository');
const { ForbiddenException, BadRequestException, UnauthorizedException } = require('../exceptions');
const { httpErrorTransform } = require('../../app/utils/httpCodes');
const bcrypt = require('bcrypt');

class AuthService {
  async register (username, password, type) {
    const isUsernameDuplicate = await UserRepository.isUsernameDuplicate(username);
    if (isUsernameDuplicate) {
      throw new BadRequestException('Username already exists');
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await UserRepository.addUser(username, hashPassword, type);
    const authTokens = await TokenService.generateAuthTokens(user);
    return {
      user,
      authTokens
    }
  }

  async login (username, password) {
    const user = await UserRepository.getUser(username, password);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException(httpErrorTransform.unauthorized, 'Incorrect username or password');
    }
    const authTokens = await TokenService.generateAuthTokens(user);
    return {
      user,
      authTokens
    }
  }

  async requestRefreshToken (token) {
    const tokenDB = await RefreshTokenRepository.get(token);
    if (!tokenDB.length) {
      throw new ForbiddenException(httpErrorTransform.forbiden);
    }
    const user = TokenService.verifyRefreshToken(token);
    await RefreshTokenRepository.delete(token);
    const authTokens = await TokenService.generateAuthTokens(user);
    return authTokens;
  }

  async logout (token) {
    await RefreshTokenRepository.delete(token);
  }
}

module.exports = new AuthService();
