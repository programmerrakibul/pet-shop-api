import { Pet } from "../models/Pet.js";
import { InvalidDataError } from "../utils/errorHandler.js";
import type { TPet } from "../types/index.js";
import type { TResponse } from "../types/response.js";
import type { Request, Response, NextFunction } from "express";

export const postPetData = async (
  req: Request<{}, {}, TPet>,
  res: Response<TResponse<TPet>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { medicalRecord, ...petData } = req.body || {};

    if (Object.keys(petData).length === 0) {
      throw new InvalidDataError("Pet data is required in the request body!");
    }

    const newPet = new Pet({
      name: petData.name,
      species: petData.species,
      breed: petData.breed,
      age: petData.age,
      adopted: petData.adopted,
      intakeDate: petData.intakeDate,
      adoptionDate: petData.adoptionDate,
      photo: petData.photo,
      medicalRecord: {
        vaccinations:
          typeof medicalRecord.vaccinations === "string"
            ? (medicalRecord.vaccinations as string)?.split(",")
            : medicalRecord.vaccinations,
        weightKg: medicalRecord.weightKg,
        microchipId: medicalRecord.microchipId,
      },
    });

    await newPet.save();

    res.status(201).send({
      success: true,
      message: "Pet data created successfully!",
      data: newPet,
    });
  } catch (error: any) {
    next(error);
  }
};

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
