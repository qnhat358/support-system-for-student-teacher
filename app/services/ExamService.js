const ExamRepository = require("../repositories/ExamRepository");
const QuestionRepository = require("../repositories/QuestionRepository");
const AnswerRepository = require("../repositories/AnswerRepository");
const ResultRepository = require("../repositories/ResultRepository");
const QuestionSubmissionRepository = require("../repositories/QuestionSubmisstionRepository");
const AnswerSubmissionRepository = require("../repositories/AnswerSubmissionRepository");

class ExamService {
  // [GET] /exams/
  async index () {
    return await ExamRepository.index();
  }
  // [GET] /exams/getByUserId
  async getByUserId (userId) {
    return await ExamRepository.getByUserId(userId);
  }

  // [GET] /exams/public
  async getPublic () {
    return await ExamRepository.getPublic();
  }

  // [GET] /exams/getDetailById
  async getDetailById (id) {
    return await ExamRepository.getDetailById(id);
  }

  // [GET] /exams/getById
  async getById (id) {
    return await ExamRepository.getById(id);
  }
  // [GET] /exams/:id/questions
  async getQuestionByExamId (id) {
    return await QuestionRepository.getQuestionByExamId(id);
  }

  // [GET] /exams/join/:id
  async join (id) {
    return await ExamRepository.join(id);
  }

  // [POST] /exams/create
  async create (userId, reqExam) {
    const exam = await ExamRepository.create(userId, reqExam);
    for (let reqQuestion of reqExam.questions){
      const question = await QuestionRepository.create(exam.id, reqQuestion);
      for (let reqAnswer of reqQuestion.answers) {
        await AnswerRepository.create(question.id, reqAnswer);
      };
    };
    return exam;
  }

  // [PUT] /exams/update
  async update (id, request) {
    const exam = await ExamRepository.update(id, request);
    for (let reqQuestion of request.questions) {
      const existingQuestion = await QuestionRepository.selectById(reqQuestion.id);
      if (existingQuestion) {
        await QuestionRepository.update(reqQuestion);
        for (let reqAnswer of reqQuestion.answers) {
          await AnswerRepository.update(reqAnswer);
        }
      } else {
        const question = await QuestionRepository.create(exam.id, reqQuestion);
        for (let reqAnswer of reqQuestion.answers) {
          await AnswerRepository.create(question.id, reqAnswer);
        }
      }
    }
    return exam;
  }

  // [POST] /exams/submit
  async submit (userId, exam) {
    let totalPoint = 0;
    let totalQuestion = 0;
    for (let i = 0; i < exam.questions.length; i++) {
      const question = exam.questions[i];
      const correctAnswers = await AnswerRepository.selectByQuestionId(
        question.id
      );
      const userAnswers = question.answers;

      for (const userAnswer of userAnswers) {
        const correctAnswer = correctAnswers.find(
          (answer) => answer.id === userAnswer.id
        );

        if (userAnswer.isCorrect !== correctAnswer.is_correct) {
          question.correctAnswer = correctAnswers;
          question.isFalse = true;
          break;
        }
      }
      if (!question.isFalse) {
        totalPoint += question.point;
        totalQuestion += 1;
      }
    }
    const result = {
      exam_id: exam.id,
      total_point: totalPoint,
      total_question: totalQuestion,
      time_start: exam.timeStart,
      time_end: exam.timeEnd,
    };
    const resultDb = await ResultRepository.create(userId, result);
    exam.questions.forEach(async (question) => {
      const questionDb = await QuestionSubmissionRepository.create(
        resultDb.id,
        question
      );
      question.answers.forEach(async (answer) => {
        await AnswerSubmissionRepository.create(questionDb.id, answer);
      });
    });
    return resultDb;
  }
}
module.exports = new ExamService();
