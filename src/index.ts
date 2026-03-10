import cors from "cors";
import express, { json } from "express";
import { petsRouter } from "./routes/petsRouter.js";
import type { ResponseData } from "./types/response.js";
import type { Response, Request, Express } from "express";
import { connectDB } from "./config/db.js";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 8000;

app.use(json());
app.use(cors());

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.get(
      "/",
      (req: Request, res: Response<ResponseData<undefined>>): void => {
        res.send({
          success: true,
          message: "Welcome to the Pet Shop API",
        });
      },
    );

    app.use("/api/v1/pets", petsRouter);

    app.use((req: Request, res: Response<ResponseData<undefined>>): void => {
      res.status(404).send({
        success: false,
        message: "Route not found!",
      });
    });

    app.listen(PORT, (): void =>
      console.log(`Server is running on port ${PORT}`),
    );
  } catch (error) {
    console.log("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
