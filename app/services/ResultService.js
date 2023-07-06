const ExamRepository = require('../repositories/ExamRepository');
const QuestionRepository = require('../repositories/QuestionRepository');
const AnswerRepository = require('../repositories/AnswerRepository');
const ResultRepository = require('../repositories/ResultRepository');
const QuestionSubmissionRepository = require('../repositories/QuestionSubmisstionRepository');
const AnswerSubmissionRepository = require('../repositories/AnswerSubmissionRepository');

class ResultService {
  // [GET] /results/users
  async getByUserId (userId) {
    return await ResultRepository.getByUserId(userId);

  }
  // [GET] /results/getByExamId/:id
  async getByExamId (id) {
    return await ResultRepository.getByExamId(id);
  }
  // [GET] /results/getDetailByExamId/:id
  async getDetailByExamId (id) {
    const result = await ResultRepository.getDetailByExamId(id);
    const exam = await ExamRepository.getById(id);
    return {
      exam, result
    }
  }

  // [GET] /results/:id
  async getDetailById (resultId) {
    let result = await ResultRepository.getById(resultId);
    let questions = await QuestionSubmissionRepository.getByResultId(result.id);
    let { id, ...exam } = await ExamRepository.getById(result.exam_id);
    let data = {
      ...exam,
      exam_id: result.exam_id,
      point: result.total_point,
      time_start: result.time_start,
      time_end: result.time_end,
      questions: [],
    };
    for (let question of questions) {
      const questionDetail = await QuestionRepository.selectById(question.question_id);
      question = {
        ...questionDetail,
        ...question
      }
      const answers = await AnswerSubmissionRepository.getByQuestionSubId(question.id);
      console.log(answers);
      const formattedAnswers = await Promise.all(answers.map(async answer => {
        const answerDetail = await AnswerRepository.selectById(answer.true_answer_id);
        return {
          ...answerDetail,
          is_check: answer.is_checked,
        }
      })
      );
      data.questions.push({
        ...question,
        answers: formattedAnswers,
      });
    }
    return data
  }
}
module.exports = new ResultService();
