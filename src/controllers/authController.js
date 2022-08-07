import connection from "../database/postgres.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import userRepository from "../../repositories/userRepository.js";

export async function createUser(req, res) {
  const user = req.body;

  try {
    const { name, email, password } = user;
    await userRepository.createUser(name, email, password);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function login(req, res) {}
