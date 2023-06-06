const QuestionService = require('../services/QuestionService');
class QuestionController {
  // [GET] /Questions/
  async index (req, res, next) {
    try {
      const questions = await QuestionService.index();
      res.responseSuccess(questions);
    } catch (error) {
      res.responseError(error);
    }
  }
}
module.exports = new QuestionController();