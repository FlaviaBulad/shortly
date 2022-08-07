import { Router } from "express";

import { createUser, login } from "../controllers/authController.js";

import { validateEmail } from "../middlewares/authValidation.js";

import { validadeSchema } from "../middlewares/authSchemaValidator.js";

import signUpSchema from "../schemas/signUpSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validadeSchema(signUpSchema),
  validateEmail,
  createUser
);
authRouter.post("/signin", validadeSchema(loginSchema), login);

export default authRouter;
