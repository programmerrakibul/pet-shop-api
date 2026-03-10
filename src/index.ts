import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import { petsRouter } from "./routes/petsRouter.js";
import type { ResponseData } from "./types/response.js";
import type { Response, Request, Express } from "express";

config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 8000;

app.use(json());
app.use(cors());

app.get("/", (req: Request, res: Response<ResponseData<undefined>>): void => {
  res.send({
    success: true,
    message: "Welcome to the Pet Shop API",
  });
});

app.use("/api/v1/pets", petsRouter);

app.use((req: Request, res: Response<ResponseData<undefined>>): void => {
  res.status(404).send({
    success: false,
    message: "Route not found!",
  });
});

app.listen(PORT, (): void => console.log(`Server is running on port ${PORT}`));
