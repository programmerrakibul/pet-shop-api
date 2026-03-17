import { Router } from "express";
import { postUser } from "../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.post("/", postUser);
