import { Pet } from "../models/Pet.js";
import { InvalidDataError } from "../utils/errorHandler.js";
import type { TPet } from "../types/index.js";
import type { TResponse } from "../types/response.js";
import type { Request, Response, NextFunction } from "express";

export const getAllPetsData = async (
  req: Request,
  res: Response<TResponse<TPet>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const pets = await Pet.find({});

    res.send({
      success: true,
      message: "All Pets data retrieved successfully!",
      data: pets || [],
    });
  } catch (error: any) {
    next(error);
  }
};
