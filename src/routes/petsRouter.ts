import { Router } from "express";
import { petSchemaZ } from "@/validators/petsValidator.js";
import { validate } from "@/middlewares/validatorMiddleware.js";
import {
  getAllPetsData,
  getSinglePetData,
  postPetData,
} from "@/controllers/petsController.js";

export const petsRouter = Router();

petsRouter.post("/", validate(petSchemaZ), postPetData);

petsRouter.get("/", getAllPetsData);

petsRouter.get("/:id", getSinglePetData);
