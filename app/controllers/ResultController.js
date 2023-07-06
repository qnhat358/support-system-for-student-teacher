const ResultService = require('../services/ResultService');

class ResultController {
  // [GET] /results/users
  async getByUserId(req, res, next) {
    try {
      const results = await ResultService.getByUserId(req.user.UserId);
      res.responseSuccess(results);
    } catch (error) {
      res.responseError(error);
    }
  }

  // [GET] /results/getByExamId/:id
  async getByExamId(req, res, next) {
    const id = req.params.id;
    try {
      const results = await ResultService.getByExamId(id);
      res.responseSuccess(results);
    } catch (error) {
      res.responseError(error);
    }
  }
  // [GET] /results/getDetailByExamId/:id
  async getDetailByExamId(req, res, next) {
    const id = req.params.id;
    try {
      const results = await ResultService.getDetailByExamId(id);
      res.responseSuccess(results);
    } catch (error) {
      res.responseError(error);
    }
  }

  // [GET] /results/:id"
  async getDetailById(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ResultService.getDetailById(id);
      res.responseSuccess(result);
    } catch (error) {
      res.responseError(error);
    }
  }
}
module.exports = new ResultController();