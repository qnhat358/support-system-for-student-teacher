const Pool = require("pg").Pool;
const { httpErrorTransform } = require("../app/utils/httpCodes");
const { InternalServerException } = require("../app/exceptions");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 30, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // How long a connection can remain idle in the pool
});

const executeQuery = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } catch (error) {
    throw new InternalServerException(
      httpErrorTransform.query_error,
      error.message
    );
  } finally {
    if (client) {
      client.release(); // Release the connection back to the pool
    }
  }
};

module.exports = {
  executeQuery,
};
