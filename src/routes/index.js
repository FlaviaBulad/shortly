import { Router } from "express";

import authRouter from "./authRouter.js";
import rankingRouter from "./rankingRouter.js";
import urlsRouter from "./urlsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(userRouter);
router.use(rankingRouter);

export default router;
