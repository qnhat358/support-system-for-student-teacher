const ExamService = require('../services/ExamService');

class ExamController {
  // [GET] /exams/
  async index(req, res, next) {
    try {
      const exams = await ExamService.index();
      res.responseSuccess(exams);
    } catch (error) {
      res.responseError(error);
    }
  }

  // [POST] /exams/create
  async create(req, res, next) {
    try {
      const exam = await ExamService.create(req.user.UserId, req.body);
      res.responseSuccess(exam);
    } catch (error) {
      res.responseError(error);
    }
  }

  // [GET] /exams/getByUserId/:id
  async getByUserId(req, res, next) {
    const userId = req.params.id;
    try {
      const exams = await ExamService.getByUserId(userId);
      res.responseSuccess(exams);
    } catch (error) {
      res.responseError(error);
    }
  }

  // [GET] /exams/public
  async getPublic (req, res, next) {
    try {
      const exams = await ExamService.getPublic();
      res.responseSuccess(exams)
    } catch (error) {
      res.responseError(error)
    }
  }
  // [GET] /exams/getDetailById/:id
  async getDetailById(req, res, next) {
    const id = req.params.id;
    try {
      const exams = await ExamService.getDetailById(id);
      res.responseSuccess(exams);
    } catch (error) {
      res.responseError(error);
    }
  }
  // [GET] /exams/getById/:id
  async getById (req, res, next) {
    const id = req.params.id;
    try {
      const exams = await ExamService.getById(id);
      res.responseSuccess(exams)
    } catch (error) {
      res.responseError(error)
    }
  }
  // [GET] /exams/:id/questions
  async getQuestionByExamId (req, res, next) {
    const id = req.params.id;
    try {
      const exams = await ExamService.getQuestionByExamId(id);
      res.responseSuccess(exams)
    } catch (error) {
      res.responseError(error)
    }
  }
  // [GET] /exams/join/:id
  async join (req, res, next) {
    const id = req.params.id;
    try {
      const exams = await ExamService.join(id);
      res.responseSuccess(exams)
    } catch (error) {
      res.responseError(error)
    }
  }
  // [GET] /exams/submit
  async submit (req, res, next) {
    try {
      const exam = await ExamService.submit(req.user.UserId, req.body);
      res.responseSuccess(exam)
    } catch (error) {
      res.responseError(error)
    }
  }

  // [PUT] /exams/update/:id
  async update(req, res, next) {
    const id = req.params.id;
    try {
      const exam = await ExamService.update(id, req.body);
      res.responseSuccess(exam);
    } catch (error) {
      res.responseError(error);
    }
  }
}
module.exports = new ExamController();