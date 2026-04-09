import { postUser } from "@/controllers/usersController.js";
import { validate } from "@/middlewares/validatorMiddleware.js";
import { userSchemaZ } from "@/validators/usersValidator.js";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.post("/", validate(userSchemaZ), postUser);
