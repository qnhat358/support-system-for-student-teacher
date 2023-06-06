const DB = require('../../config/database.js');
const { UnauthorizedException } = require('../exceptions')
const { httpErrorTransform } = require('../../app/utils/httpCodes')
class UserRepository {
  async index () {
    return await DB.executeQuery("SELECT * FROM users");
  }

  async isUsernameDuplicate (username) {
    const query = "SELECT COUNT(*) FROM users WHERE username = $1";
    const result = await DB.executeQuery(query, [username]);
    const count = parseInt(result[0].count);
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }

  async addUser (username, password, type) {
    const query = `
    INSERT INTO users (username, password, type)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
    const values = [
      username,
      password,
      type,
    ];

    const result = await DB.executeQuery(query, values);
    return result[0];
  }

  async getUser (username) {
    const user = await DB.executeQuery("SELECT * FROM users WHERE users.username = $1", [username])
    //TODO: move to service
    if (!user.length) {
      throw new UnauthorizedException(httpErrorTransform.unauthorized, 'Incorrect username or password');
    }
    return user[0];
  }

  async getUserById (id) {
    const user = await DB.executeQuery("SELECT * FROM users WHERE users.id = $1", [id]);
    //TODO: move to service
    if (!user.length) {
      throw new UnauthorizedException(httpErrorTransform.unauthorized);
    }
    return user[0];
  }
}
module.exports = new UserRepository();
