const DB = require("../../config/database.js");
class ExamRepository {
  async index() {
    return await DB.executeQuery("SELECT * FROM exams AND is_deleted = false");
  }

  async getById(id) {
    const result = await DB.executeQuery(
      "SELECT id, user_id, name, topic, duration, is_public, TO_CHAR(date, 'YYYY-MM-DD') AS date, exam_start AS start, exam_end AS end, total_point FROM exams WHERE id = $1 AND is_deleted = false",
      [id]
    );
    return result[0];
  }

  async create(userId, exam) {
    const query = `
      INSERT INTO exams (user_id, grade, name, topic, duration, is_public, date, exam_start, exam_end, total_point)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [
      userId,
      exam.grade,
      exam.name,
      exam.topic,
      exam.duration,
      exam.visibility == "public" ? true : false,
      exam.date !== "" ? exam.date : null,
      exam.start !== "" ? exam.start : null,
      exam.end !== "" ? exam.end : null,
      exam.totalPoint,
    ];
    const result = await DB.executeQuery(query, values);
    return result[0];
  }

  async getByUserId(userId) {
    const query = `
      SELECT id, user_id, name, topic, duration, is_public, TO_CHAR(date, 'YYYY-MM-DD') AS date, exam_start, exam_end, total_point
      FROM exams
      WHERE user_id = $1 AND is_deleted = false
    `;
    const values = [userId];

    const result = await DB.executeQuery(query, values);
    const exams = result.map((row) => ({
      id: row.id,
      grade: row.grade,
      name: row.name,
      topic: row.topic,
      duration: row.duration,
      visibility: row.is_public ? "public" : "private",
      date: row.date,
      start: row.exam_start,
      end: row.exam_end,
      totalPoint: row.total_point,
    }));
    return exams;
  }

  async getDetailById(id) {
    const query = `
  SELECT
    exams.id AS exam_id,
    exams.grade,
    exams.name AS exam_name,
    exams.topic,
    exams.duration,
    exams.is_public,
    TO_CHAR(exams.date, 'YYYY-MM-DD') AS date,
    exams.exam_start,
    exams.exam_end,
    questions.id AS question_id,
    questions.type,
    questions.point,
    questions.content,
    answers.id AS answer_id,
    answers.content AS answer_content,
    answers.is_correct
  FROM exams
  JOIN questions ON exams.id = questions.exam_id
  JOIN answers ON questions.id = answers.question_id
  WHERE exams.id = $1 AND exams.is_deleted = false AND questions.is_deleted = false AND answers.is_deleted = false
  ORDER BY questions.id, answers.id;
`;
    const values = [id];
    // Assuming you have set up a database connection and executed the query
    const results = await DB.executeQuery(query, values);
    const exam = {
      id: results[0].exam_id,
      grade: results[0].grade,
      name: results[0].exam_name,
      topic: results[0].topic,
      duration: results[0].duration,
      visibility: results[0].is_public ? "public" : "private",
      date: results[0].date,
      start: results[0].exam_start,
      end: results[0].exam_end,
      questions: [],
    };

    let currentQuestionId = null;
    let currentQuestion = null;

    for (const row of results) {
      if (row.question_id !== currentQuestionId) {
        // Start a new question
        const question = {
          id: row.question_id,
          type: row.type,
          point: row.point,
          content: row.content,
          answers: [],
        };

        exam.questions.push(question);
        currentQuestion = question;
        currentQuestionId = row.question_id;
      }

      // Add answer to the current question
      const answer = {
        id: row.answer_id,
        content: row.answer_content,
        isCorrect: row.is_correct,
      };

      currentQuestion.answers.push(answer);
    }
    return exam;
  }

  async join(id) {
    const result = await DB.executeQuery(
      "SELECT COUNT(id) FROM exams WHERE id = $1 AND is_public = false AND is_deleted = false",
      [id]
    ); //TODO check end before present
    return result[0].count > 0;
  }

  async getPublic() {
    const query = `
      SELECT id, user_id, name, grade, topic, duration, is_public, TO_CHAR(date, 'YYYY-MM-DD') AS date, exam_start, exam_end, total_point
      FROM exams
      WHERE is_public = true AND is_deleted = false
    `;

    const result = await DB.executeQuery(query);
    const exams = result.map((row) => ({
      id: row.id,
      grade: row.grade,
      name: row.name,
      topic: row.topic,
      duration: row.duration,
      visibility: row.is_public ? "public" : "private",
      date: row.date,
      start: row.exam_start,
      end: row.exam_end,
      totalPoint: row.total_point,
    }));
    return exams;
  }
  // Update Exam
  async update(request) {
    const query = `
      UPDATE exams
      SET 
        grade = $1, 
        name = $2, 
        topic = $3, 
        duration = $4, 
        is_public = $5, 
        date = $6, 
        exam_start = $7, 
        exam_end = $8, 
        total_point = $9 
      WHERE id = $10 
      RETURNING *
    `;
    const values = [
      request.grade,
      request.name,
      request.topic,
      request.duration,
      request.visibility == "public" ? true : false,
      request.date !== "" ? request.date : null,
      request.start !== "" ? request.start : null,
      request.end !== "" ? request.end : null,
      request.totalPoint,
      request.id,
    ];
    const result = await DB.executeQuery(query, values);
    return result[0];
  }
}
module.exports = new ExamRepository();
