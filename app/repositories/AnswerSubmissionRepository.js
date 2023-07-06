const DB = require('../../config/database.js');
class AnswerSubmissionRepository {
  async getById (id) {
    const result = await DB.executeQuery("SELECT * FROM answer_submissions WHERE id = $1", [id]);
    return result[0];
  }
  async getByQuestionSubId (id) {
    const result = await DB.executeQuery("SELECT true_answer_id, is_checked FROM public.answer_submissions WHERE question_id = $1", [id]);
    return result;
  }

  async create (question_id, answer) {
    const query = `
      INSERT INTO answer_submissions (question_id, true_answer_id, is_checked)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [
      question_id,
      answer.id,
      answer.isCorrect ?? false,
    ];
    const result = await DB.executeQuery(query, values);
    return result[0];
  }
}
module.exports = new AnswerSubmissionRepository();
