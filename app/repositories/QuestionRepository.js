const DB = require('../../config/database.js');
class QuestionRepository {
  async index () {
    return await DB.executeQuery("SELECT * FROM questions");
  }
  
  async selectById(questionId) {
    const selectQuery = `
      SELECT * FROM questions WHERE id = $1 AND is_deleted = false;
    `;
  
    const selectValues = [
      questionId,
    ];
  
    const result = await DB.executeQuery(selectQuery, selectValues);
    return result[0];
  }

  async update(question) {
    const updateQuery = `
      UPDATE questions
      SET type = $1, point = $2, content = $3
      WHERE id = $4
      RETURNING *
    `;
  
    const updateValues = [
      question.type,
      question.point,
      question.content,
      question.id,
    ];
  
    const result = await DB.executeQuery(updateQuery, updateValues);
    return result[0];
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

  async getQuestionByExamId (examId) {
    const query = `
    SELECT q.id AS id, q.content AS question_content, q.point AS question_point, q.type,
      a.id AS answer_id, a.content AS answer_content, a.is_correct AS answer_is_correct
    FROM questions q
    INNER JOIN answers a ON q.id = a.question_id
    WHERE q.exam_id = $1
    `;

    const values = [
      examId,
    ];

    const result = await DB.executeQuery(query, values);
    const questions = [];
    result.forEach((row) => {
      const { id, question_content, question_point, type, answer_id, answer_content } = row;
      // Check if the question already exists in the array
      const existingQuestion = questions.find(q => q.id === id);
      if (existingQuestion) {
        // Add the answer to the existing question
        existingQuestion.answers.push({
          id: answer_id,
          content: answer_content,
          isCorrect: false,
        });
      } else {
        // Create a new question object
        const newQuestion = {
          id: id,
          content: question_content,
          point: question_point,
          type: type,
          answers: [
            {
              id: answer_id,
              content: answer_content,
              isCorrect: false,
            },
          ],
        };
        questions.push(newQuestion);
      }
    });
    return questions;
  }
}
module.exports = new QuestionRepository();
