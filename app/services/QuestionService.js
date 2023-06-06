const QuestionRepository = require('../repositories/QuestionRepository');

class QuestionService {
  // [GET] /Questions/
  async index () {
    return await QuestionRepository.index();
  }
}
module.exports = new QuestionService();
