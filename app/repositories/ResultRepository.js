const DB = require('../../config/database.js');
class ResultRepository {
  async getById (id) {
    const result = await DB.executeQuery("SELECT id, user_id, name, topic, duration, is_public, TO_CHAR(date, 'YYYY-MM-DD') AS date, exam_start AS start, exam_end AS end, total_point FROM exams WHERE id = $1", [id]);
    return result[0];
  }

  async getByUserId (id) {
    const result = await DB.executeQuery("SELECT e.*, r.total_point, r.time_start, r.time_end FROM exams e JOIN results r ON e.id = r.exam_id WHERE r.user_id = $1 ORDER BY r.created_at DESC;", [id]);
    return result;
  }

  async getByExamId (id) {
    const query = `
    SELECT
      qs.question_id,
      COUNT(CASE WHEN qs.is_false = false THEN 1 END) AS true_count,
      COUNT(CASE WHEN qs.is_false = true THEN 1 END) AS false_count
    FROM
      public.exams e
      INNER JOIN public.results r ON e.id = r.exam_id
      INNER JOIN public.question_submissions qs ON r.id = qs.result_id
    WHERE
      e.id = $1
    GROUP BY
      qs.question_id;
    `
    const result = await DB.executeQuery(query, [id]);
    return result;
  }

  async create (userId, result) {
    const query = `
      INSERT INTO results (user_id, exam_id, total_point, total_question, time_start, time_end)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      userId,
      result.exam_id,
      result.total_point,
      result.total_question,
      result.time_start ? result.time_start : '2023-06-14 12:00:00',
      result.time_end ? result.time_end : '2023-06-14 12:00:00',
    ];
    const resultDb = await DB.executeQuery(query, values);
    return resultDb[0];
  }
}
module.exports = new ResultRepository();
