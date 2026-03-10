import { pets } from "../data/pets.js";
import type { Pet } from "../types/index.js";
import type { GetPetsQuery, GetSinglePetParams } from "../types/request.js";
import type { ResponseData } from "../types/response.js";
import type { Response, Request } from "express";

export const getPets = (
  req: Request<{}, {}, {}, GetPetsQuery>,
  res: Response<ResponseData<Pet>>,
): void => {
  try {
    const { adopted, species } = req.query;

    let filteredPets: Pet[] = pets;

    if (adopted) {
      filteredPets = pets.filter(
        (pet: Pet): boolean =>
          pet.adopted === JSON.parse(adopted.toLowerCase()),
      );
    }

    if (species) {
      filteredPets = pets.filter(
        (pet: Pet): boolean =>
          pet.species.toLowerCase() === species.toLowerCase(),
      );
    }

    res.send({
      success: true,
      message: "Pets data retrieved successfully",
      data: filteredPets,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSinglePet = (
  req: Request<GetSinglePetParams>,
  res: Response<ResponseData<Pet>>,
): void => {
  try {
    const { id } = req.params;
    const pet: Pet | undefined = pets.find(
      (p: Pet): boolean => p.id.toString() === id,
    );

    if (!pet) {
      res.status(404).send({
        success: false,
        message: `Pet with id ${id} not found!`,
      });

      return;
    }

    res.send({
      success: true,
      message: "Pet data retrieved successfully",
      data: pet,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
