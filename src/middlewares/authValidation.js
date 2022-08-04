import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";

import db from "../database/postgres.js";
import bcrypt from "bcrypt";

export async function signUpBodyValidation(req, res, next) {
  const newUser = req.body;

  const validate = signUpSchema.validate(newUser, { abortEarly: false });

  if (validate.error) {
    return res.status(422).send("Reveja os campos");
  }
  next();
}

export async function emailValidation(req, res, next) {
  try {
    const { email } = req.body;

    const { rowCount } = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (rowCount !== 0) {
      return res.status(409).send("Email já cadastrado!");
    }
    next();
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function signInBodyValidation(req, res, next) {
  const user = req.body;

  const validate = signInSchema.validate(user, { abortEarly: false });

  if (validate.error) {
    return res.status(422).send("Reveja os campos");
  }

  next();
}

export async function signInValidation(req, res, next) {
  try {
    const { email, password } = req.body;

    const { rowCount, rows: users } = await db.query(
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
