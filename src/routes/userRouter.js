import { Router } from "express";
import { validateToken } from "../middlewares/authValidation.js";

import { getUserById } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("users/:id", validateToken, getUserById);

export default userRouter;
