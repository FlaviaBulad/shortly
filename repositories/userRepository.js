import connection from "../src/database/postgres.js";

import bcrypt from "bcrypt";

async function getUserEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function getUserId(id) {
  return connection.query(`SELECT * FROM users WHERE id = $1 `, [id]);
}

async function createUser(name, email, password) {
  const SALT = 10;
  passwordHash = bcrypt.hashSync(password, SALT);
  return connection.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, passwordHash]
  );
}

const userRepository = { getUserEmail, getUserId, createUser };

export default userRepository;
