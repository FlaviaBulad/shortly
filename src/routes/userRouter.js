import { Router } from "express";
import { validateToken } from "../middlewares/authValidation.js";

const userRouter = Router();

// userRouter.get("users/:id", validateToken, );

export default userRouter;
