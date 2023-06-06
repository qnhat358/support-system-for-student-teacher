const ExamRepository = require('../repositories/ExamRepository');
const QuestionRepository = require('../repositories/QuestionRepository');
const AnswerRepository = require('../repositories/AnswerRepository');

class ExamService {
  // [GET] /exams/
  async index () {
    return await ExamRepository.index();
  }
  // [GET] /exams/getByUserId
  async getByUserId (userId) {
    return await ExamRepository.getByUserId(userId);
  }

  // [GET] /exams/getDetailById
  async getDetailById (id) {
    return await ExamRepository.getById(id);
  }

  // [POST] /exams/create
  async create (userId, reqExam) {
    const exam = await ExamRepository.create(userId, reqExam);
    reqExam.questions.map(async (reqQuestion) => {
      const question = await QuestionRepository.create(exam.id, reqQuestion);
      await reqQuestion.answers.map(async (reqAnswer) => {
        await AnswerRepository.create(question.id, reqAnswer);
      })
    })
    return exam;
  }
}
module.exports = new ExamService();
