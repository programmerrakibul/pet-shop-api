import express from "express";
import { config } from "dotenv";
import type { Response, Request, Express } from "express";
import { ResponseData } from "./types/response.js";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 8000;

config();

app.get("/", (req: Request, res: Response<ResponseData<undefined>>): void => {
  res.send({
    success: true,
    message: "Welcome to the Pet Shop API",
  });
});

app.use((req: Request, res: Response<ResponseData<undefined>>): void => {
  res.status(404).send({
    success: false,
    message: "Route not found!",
  });
});

app.listen(PORT, (): void => console.log(`Server is running on port ${PORT}`));
