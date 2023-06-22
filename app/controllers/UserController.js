const UserService = require("../services/UserService");

class UserController {
  // [GET] /users/
  async index(req, res, next) {
    try {
      const users = await UserService.index();
      res.responseSuccess(users);
    } catch (error) {
      res.responseError(error);
    }
  }

  // [GET] /users/{id}
  async getUser(req, res, next) {
    const id = req.params.id;
    try {
      const { Password, ...others } = await UserService.getUserById(id);
      res.responseSuccess({ ...others });
    } catch (error) {
      res.responseError(error);
    }
  }

  // [PUT] /users/{id}
  async update(req, res, next) {
    try {
      const user = await UserService.update(req.params.id, req.body);
      res.responseSuccess(user);
    } catch (error) {
      res.responseError(error);
    }
  }
}
module.exports = new UserController();
