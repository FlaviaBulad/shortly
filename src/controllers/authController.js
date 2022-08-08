import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import userRepository from "../repositories/userRepository.js";
import sessionRepository from "../repositories/sessionRepository.js";

export async function createUser(req, res) {
  const user = req.body;

  try {
    const emailRegistered = userRepository.getUserEmail(user.email);

    if (emailRegistered.rowCount > 0) {
      return res.status(409).send("Email já cadastrado");
    }

    const { name, email, password } = user;
    await userRepository.createUser(name, email, password);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const { rows: users } = await userRepository.getUserEmail(email);

  const [user] = users;

  if (!user) {
    return res.sendStatus(401);
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await sessionRepository.createSession(token, user.id);
    return res.send(token);
  }
  res.sendStatus(401);
}
