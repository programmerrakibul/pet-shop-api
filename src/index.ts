import express from "express";
import { config } from "dotenv";
import { ResponseData } from "./types/response.js";
import { pets } from "./data/pets.js";
import type { Response, Request, Express } from "express";
import type { Pet } from "./types/index.js";

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
  (req: Request, res: Response<ResponseData<Pet>>): void => {
    res.send({
      success: true,
      message: "Pets data retrieved successfully",
      data: pets,
    });
  },
);

app.use((req: Request, res: Response<ResponseData<undefined>>): void => {
  res.status(404).send({
    success: false,
    message: "Route not found!",
  });
});

app.listen(PORT, (): void => console.log(`Server is running on port ${PORT}`));
