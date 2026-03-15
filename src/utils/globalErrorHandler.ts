import mongoose from "mongoose";
import type { TResponse } from "../types/response.js";
import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response<TResponse<undefined>>,
  next: NextFunction,
): void => {
  console.log("From global error: ", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error!";

  if (err instanceof mongoose.Error.ValidationError) {
    console.log(err.errors);

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
