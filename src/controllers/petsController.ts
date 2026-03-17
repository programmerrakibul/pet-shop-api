import { Pet } from "../models/Pet.js";
import { NotFoundError } from "../utils/errorHandler.js";

import type { TSinglePetParams } from "../types/request.js";
import type { TPet } from "../types/index.js";
import type { TResponse } from "../types/response.js";
import type { Request, Response, NextFunction } from "express";

export const postPetData = async (
  req: Request<{}, {}, TPet>,
  res: Response<TResponse<TPet>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { medicalRecord, ...petData } = req.body;

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
    } as TPet);

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

export const getSinglePetData = async (
  req: Request<TSinglePetParams>,
  res: Response<TResponse<TPet>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const pet = await Pet.findById(id).lean();

    if (!pet) {
      throw new NotFoundError(`Pet data not found for this id: ${id}`);
    }

    res.send({
      success: true,
      message: "Single Pet data retrieved successfully!",
      data: pet,
    });
  } catch (error) {
    next(error);
  }
};
