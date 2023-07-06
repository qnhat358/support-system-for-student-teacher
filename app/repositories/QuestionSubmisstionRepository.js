const DB = require('../../config/database.js');
class QuestionSubmissionRepository {
  async getById (id) {
    const result = await DB.executeQuery("SELECT * FROM question_submissions WHERE id = $1", [id]);
    return result[0];
  }

  async getByResultId (id) {
    const result = await DB.executeQuery("SELECT id, question_id AS question_id, is_false FROM public.question_submissions WHERE result_id = $1", [id]);
    return result;
  }

  async create (result_id, question) {
    const query = `
      INSERT INTO question_submissions (result_id, question_id, is_false)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [
      result_id,
      question.id,
      question.isFalse ?? false,
    ];
    const result = await DB.executeQuery(query, values);
    return result[0];
  }
}
module.exports = new QuestionSubmissionRepository();
