const DB = require('../../config/database.js');
class RefreshTokenRepository {
  async create (token, userId) {
    const sql = "INSERT INTO refresh_tokens (token, user_id) VALUES ($1, $2)";
    return await DB.executeQuery(sql, [token, userId]);
  }
  async get (token) {
    const sql = "Select * FROM refresh_tokens WHERE token = $1";
    return await DB.executeQuery(sql, [token]);
  }
  async delete (token) {
    const sql = "UPDATE refresh_tokens SET is_deleted = true, deleted_at = CURRENT_TIMESTAMP WHERE token = $1";
    return await DB.executeQuery(sql, [token]);
  }
}
module.exports = new RefreshTokenRepository();
