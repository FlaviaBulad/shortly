import { Router } from "express";

import { validateSchema } from "../middlewares/authSchemaValidator.js";
import { validateToken } from "../middlewares/authValidation.js";

import urlSchema from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), validateToken);

export default urlsRouter;
