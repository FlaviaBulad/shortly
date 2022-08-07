import { Router } from "express";
import {
  deleteUrl,
  getUserUrl,
  openUrl,
  shortenUrl,
} from "../controllers/urlsController.js";

import { validateSchema } from "../middlewares/authSchemaValidator.js";
import { validateToken } from "../middlewares/authValidation.js";

import urlSchema from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  validateToken,
  shortenUrl
);
urlsRouter.get("/urls/:id", getUserUrl);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);

export default urlsRouter;
