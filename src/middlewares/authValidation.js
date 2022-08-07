import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";

import connection from "../database/postgres.js";

import bcrypt from "bcrypt";

export async function emailValidation(req, res, next) {
  try {
    const { email } = req.body;

    const { rowCount } = await connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (rowCount > 0) {
      return res.status(409).send("Email já cadastrado!");
    }
    next();
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function signInValidation(req, res, next) {
  try {
    const { email, password } = req.body;

    const { rowCount, rows: users } = await connection.query(
      `SELECT * FROM users WHERE email  = $1`,
      [email]
    );

    if (rowCount === 0 || bcrypt.compareSync(password, users[0].password)) {
      return res.status(401).send("Email ou senha incorretos!");
    }
    res.locals.userId = users[0].id;

    next();
  } catch (error) {
    return res.sendStatus(500);
  }
}
