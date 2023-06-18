const UserRepository = require("../repositories/UserRepository");

class UserService {
  // [GET] /users/
  async index() {
    return await UserRepository.index();
  }

  // [GET] /users/:id
  async getUserById(id) {
    return await UserRepository.getUserById(id);
  }

  // [GET] /users/
  async update(userId, request) {

    return await UserRepository.update(userId, request);
  }
}
module.exports = new UserService();
