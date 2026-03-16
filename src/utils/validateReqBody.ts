import { InvalidDataError } from "./errorHandler.js";

import type { Request, Response, NextFunction } from "express";

export const validateReqBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (Object.keys(req.body || {}).length === 0) {
    throw new InvalidDataError("Request body is required!");
  }

  next();
};
