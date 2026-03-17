import mongoose from "mongoose";
import { ZodError } from "zod";

import type { TResponse } from "../types/response.js";
import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response<TResponse<undefined>>,
  next: NextFunction,
): void => {
  console.log("From global error: ", err);

  let statusCode: number = err.statusCode || 500;
  let message: string = err.message || "Internal Server Error!";

  const mongoError = err as {
    code?: number;
    keyValue?: Record<string, unknown>;
  };

  if (err instanceof ZodError) {
    const issues = Object.values(err.issues);

    message = issues.map((val) => val.message).join(", ");
    statusCode = 400;
  }

  if (mongoError.code === 11000 && mongoError.keyValue) {
    statusCode = 400;
    const fields = Object.keys(mongoError.keyValue);
    message = fields
      .map(
        (field) =>
          `${field.charAt(0).toUpperCase() + field.slice(1)} is already exist!`,
      )
      .join(", ");
  }

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).send({
    success: false,
    message: message,
  });
};
