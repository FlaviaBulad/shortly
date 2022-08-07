import connection from "../database/postgres.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const user = req.body;
}

export async function login(req, res) {}
