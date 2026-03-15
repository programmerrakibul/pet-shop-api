import mongoose from "mongoose";
import type { TAppError } from "../types/index.js";
import type { TResponse } from "../types/response.js";
import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: TAppError,
  req: Request,
  res: Response<TResponse<undefined>>,
  next: NextFunction,
): void => {
  console.log("From global error: ", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error!";

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)[0].message;
  }

  res.status(statusCode).send({
    success: false,
    message: message,
  });
};
