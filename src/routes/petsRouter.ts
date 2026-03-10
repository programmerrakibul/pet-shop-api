import { Router } from "express";
import { getPets, getSinglePet } from "../controllers/petsController.js";

export const petsRouter = Router();

petsRouter.get("/", getPets);

petsRouter.get("/:id", getSinglePet);
