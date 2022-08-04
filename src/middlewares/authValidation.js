import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";

import db from "../database/postgres.js";
import bcrypt from "bcrypt";

export async function ValidateRegister(req, res, next) {
  const newUser = req.body;

  const validate = signUpSchema.validate(newUser, { abortEarly: false });

  if (validate.error) {
    return res.status(422).send("Reveja os campos");
  }

  const emailAlreadyRegistered = await db
    .collection("users")
    .findOne({ email: newUser.email });

  if (emailAlreadyRegistered) {
    return res.status(422).send("Email já cadastrado");
  }
  next();
}

export async function ValidateLogin(req, res, next) {
  const user = req.body;

  const validate = signInSchema.validate(user, { abortEarly: false });

  if (validate.error) {
    return res.status(422).send("Reveja os campos");
  }

  const registeredUser = await db
    .collection("users")
    .findOne({ email: user.email });

  if (!registeredUser) {
    return res.status(422).send("Email ou senha inválidos");
  }

  const correctPassword = bcrypt.compareSync(
    user.password,
    registeredUser.password
  );
  if (!correctPassword) {
    return res.status(422).send("Email ou senha inválidos");
  }
  next();
}
