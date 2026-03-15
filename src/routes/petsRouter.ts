import { Router } from "express";
import { getAllPetsData } from "../controllers/petsController.js";

export const petsRouter = Router();

petsRouter.get("/", getAllPetsData);
