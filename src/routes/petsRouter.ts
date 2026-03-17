import { Router } from "express";
import {
  getAllPetsData,
  getSinglePetData,
  postPetData,
} from "../controllers/petsController.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import { petSchemaZ } from "../validators/petsValidator.js";

export const petsRouter = Router();

petsRouter.post("/", validate(petSchemaZ), postPetData);

petsRouter.get("/", getAllPetsData);

petsRouter.get("/:id", getSinglePetData);
