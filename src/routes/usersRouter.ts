import { Router } from "express";
import { postUser } from "../controllers/usersController.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import { userSchemaZ } from "../validators/usersValidator.js";

export const usersRouter = Router();

usersRouter.post("/", validate(userSchemaZ), postUser);
