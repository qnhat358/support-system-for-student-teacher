const DB = require('../../config/database.js');
class AnswerRepository {
  async index () {
    return await DB.executeQuery("SELECT * FROM answers");
  }

  async selectById(id) {
    const selectQuery = `
      SELECT * FROM answers WHERE id = $1 AND is_deleted = false;
    `;
  
    const selectValues = [
      id,
    ];
  
    const result = await DB.executeQuery(selectQuery, selectValues);
    return result[0];
  }

  async update(answer) {
    const updateQuery = `
      UPDATE answers
      SET content = $1, is_correct = $2
      WHERE id = $3
      RETURNING *
    `;
  
    const updateValues = [
      answer.content,
      answer.isCorrect,
      answer.id,
    ];
  
    const result = await DB.executeQuery(updateQuery, updateValues);
    return result[0];
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

  async selectByQuestionId (questionId) {
    const query = `
      SELECT id, is_correct, content FROM answers WHERE question_id = $1
    `;

    const values = [
      questionId,
    ];

    const result = await DB.executeQuery(query, values);
    return result;
  }
}
module.exports = new AnswerRepository();
