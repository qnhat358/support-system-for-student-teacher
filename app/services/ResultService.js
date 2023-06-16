const ExamRepository = require('../repositories/ExamRepository');
const QuestionRepository = require('../repositories/QuestionRepository');
const AnswerRepository = require('../repositories/AnswerRepository');
const ResultRepository = require('../repositories/ResultRepository');
const QuestionSubmissionRepository = require('../repositories/QuestionSubmisstionRepository');
const AnswerSubmissionRepository = require('../repositories/AnswerSubmissionRepository');

class ResultService {
  // [GET] /results/getByUserId
  async getByUserId (userId) {
    return await ResultRepository.getByUserId(userId);
  }

  // [GET] /results/getDetailById
  async getDetailById (id) {
    return await ResultRepository.getById(id);
  }
}
module.exports = new ResultService();
