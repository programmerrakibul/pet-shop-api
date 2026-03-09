import express from "express";
import type { Response, Request, Express } from "express";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 8000;

app.get("/", (req: Request, res: Response): void => {
  res.send({
    success: true,
    message: "Welcome to the Pet Shop API",
  });
});

app.use((req: Request, res: Response): void => {
  res.status(404).send({
    success: false,
    message: "Route not found!",
  });
});

app.listen(PORT, (): void => console.log(`Server is running on port ${PORT}`));
