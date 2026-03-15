import { Router } from "express";
import { getAllPetsData, postPetData } from "../controllers/petsController.js";

export const petsRouter = Router();

petsRouter.post("/", postPetData);

petsRouter.get("/", getAllPetsData);
