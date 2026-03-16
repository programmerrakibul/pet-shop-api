import { Router } from "express";
import {
  getAllPetsData,
  getSinglePetData,
  postPetData,
} from "../controllers/petsController.js";

export const petsRouter = Router();

petsRouter.post("/", postPetData);

petsRouter.get("/", getAllPetsData);

petsRouter.get("/:id", getSinglePetData);
