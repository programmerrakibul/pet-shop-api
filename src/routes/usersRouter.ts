import { Router } from "express";
import { postUser } from "../controllers/usersController.js";
import { validateReqBody } from "../utils/validateReqBody.js";

export const usersRouter = Router();

usersRouter.post("/", validateReqBody, postUser);
