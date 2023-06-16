const DB = require('../../config/database.js');
class AnswerSubmissionRepository {
  async getById (id) {
    const result = await DB.executeQuery("SELECT id, user_id, name, topic, duration, is_public, TO_CHAR(date, 'YYYY-MM-DD') AS date, exam_start AS start, exam_end AS end, total_point FROM exams WHERE id = $1", [id]);
    return result[0];
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
