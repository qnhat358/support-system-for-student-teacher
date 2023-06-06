const ExamService = require('../services/ExamService');

class ExamController {
  // [GET] /exams/
  async index (req, res, next) {
    try {
      const exams = await ExamService.index();
      res.responseSuccess(exams)
    } catch (error) {
      res.responseError(error)
    }
  }

  // [POST] /exams/create
  async create (req, res, next) {
    try {
      const exam = await ExamService.create(req.user.UserId, req.body);
      res.responseSuccess(exam)
    } catch (error) {
      res.responseError(error)
    }
  }

  // [GET] /exams/getByUserId/:id
  async getByUserId (req, res, next) {
    const userId = req.params.id;
    try {
      const exams = await ExamService.getByUserId(userId);
      res.responseSuccess(exams)
    } catch (error) {
      res.responseError(error)
    }

  }
  // [GET] /exams/getDetailById/:id
  async getDetailById (req, res, next) {
    const id = req.params.id;
    try {
      const exams = await ExamService.getDetailById(id);
      res.responseSuccess(exams)
    } catch (error) {
      res.responseError(error)
    }
  }

}
module.exports = new ExamController();