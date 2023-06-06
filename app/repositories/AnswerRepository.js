const DB = require('../../config/database.js');
class AnswerRepository {
  async index () {
    return await DB.executeQuery("SELECT * FROM answers");
  }

  async create (questionId, answer) {
    const insertQuery = `
      INSERT INTO answers (question_id, content, is_correct)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [
      questionId,
      answer.content,
      answer.isCorrect,
    ];

    const result = await DB.executeQuery(insertQuery, values);
    return result[0];
  }
}
module.exports = new AnswerRepository();
