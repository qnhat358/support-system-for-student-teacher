const DB = require('../../config/database.js');
class QuestionRepository {
  async index () {
    return await DB.executeQuery("SELECT * FROM questions");
  }

  async create (examId, question) {
    const insertQuery = `
      INSERT INTO questions (exam_id, type, point, content)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [
      examId,
      question.type,
      question.point,
      question.content,
    ];

    const result = await DB.executeQuery(insertQuery, values);
    return result[0];
  }
}
module.exports = new QuestionRepository();
