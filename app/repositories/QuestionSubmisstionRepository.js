const DB = require('../../config/database.js');
class QuestionSubmissionRepository {
  async getById (id) {
    const result = await DB.executeQuery("SELECT id, user_id, name, topic, duration, is_public, TO_CHAR(date, 'YYYY-MM-DD') AS date, exam_start AS start, exam_end AS end, total_point FROM exams WHERE id = $1", [id]);
    return result[0];
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
