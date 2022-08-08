import connection from "../database/postgres.js";

async function createSession(token, userId) {
  return connection.query(
    `INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
    [token, userId]
  );
}

async function getToken(token) {
  return connection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
}

const sessionRepository = { createSession, getToken };

export default sessionRepository;
