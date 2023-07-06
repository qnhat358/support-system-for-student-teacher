const UserRepository = require("../repositories/UserRepository");
const { index } = require("../../config/algolia");

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
    const user = await UserRepository.update(userId, request);
    await index.saveObject({...user, objectID: user.id});
    return user;
  }
}
module.exports = new UserService();
