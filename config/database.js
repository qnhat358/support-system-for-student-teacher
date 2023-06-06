const Pool = require('pg').Pool
const { httpErrorTransform } = require('../app/utils/httpCodes');
const { InternalServerException } = require('../app/exceptions');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'easyquiz_db',
  password: 'chaubacho',
  port: 5432,
})

const executeQuery = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } catch (error) {
    throw new InternalServerException(httpErrorTransform.query_error, error.message);
  } finally {
    client.release();
  }
};

module.exports = {
  executeQuery,
};