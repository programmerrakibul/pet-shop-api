import express from "express";
import { config } from "dotenv";
import { ResponseData } from "./types/response.js";
import { pets } from "./data/pets.js";
import type { Response, Request, Express } from "express";
import type { Pet } from "./types/index.js";
import type { GetPetQuery } from "./types/request.js";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 8000;

config();

app.get("/", (req: Request, res: Response<ResponseData<undefined>>): void => {
  res.send({
    success: true,
    message: "Welcome to the Pet Shop API",
  });
});

app.get(
  "/api/v1/pets",
  (
    req: Request<{}, {}, {}, GetPetQuery>,
    res: Response<ResponseData<Pet>>,
  ): void => {
    try {
      const { adopted } = req.query;

      let filteredPets: Pet[] = pets;

      if (adopted) {
        filteredPets = pets.filter(
          (pet: Pet): boolean =>
            pet.adopted === JSON.parse(adopted.toLowerCase()),
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
  },
);

app.use((req: Request, res: Response<ResponseData<undefined>>): void => {
  res.status(404).send({
    success: false,
    message: "Route not found!",
  });
});

app.listen(PORT, (): void => console.log(`Server is running on port ${PORT}`));
