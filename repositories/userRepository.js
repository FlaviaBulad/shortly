import connection from "../database/postgres.js";
import bcrypt from "bcrypt";

async function getUserEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function createUser(name, email, password) {
  const SALT = 10;
  passwordHash = bcrypt.hashSync(password, SALT);
  return connection.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, passwordHash]
  );
}

const userRepository = { getUserEmail, createUser };

export default userRepository;
