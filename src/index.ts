import cors from "cors";
import express, { json } from "express";
import { petsRouter } from "./routes/petsRouter.js";
import { connectDB } from "./config/db.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { config } from "./config/config.js";
import { usersRouter } from "./routes/usersRouter.js";

import type { TResponse } from "./types/response.js";
import type { Response, Request, Express } from "express";

const app: Express = express();
const PORT = config.PORT

app.use(json());
app.use(
  cors({
    origin: [`http://localhost:${PORT}`, config.CLIENT_URL],
    credentials: true,
  }),
);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.get("/", (_req: Request, res: Response<TResponse>): void => {
      res.send({
        success: true,
        message: "Welcome to the Pet Shop API",
      });
    });

    app.use("/api/v1/pets", petsRouter);
    app.use("/api/v1/users", usersRouter);

    app.use(globalErrorHandler);

    app.use((_req: Request, res: Response<TResponse>): void => {
      res.status(404).send({
        success: false,
        message: "Route not found!",
      });
    });

    app.listen(PORT, (): void =>
      console.log(`Server is running on port ${PORT}`),
    );
  } catch (error: unknown) {
    console.log("Error starting the server:", (error as Error).message);
    process.exit(1);
  }
};

startServer();
