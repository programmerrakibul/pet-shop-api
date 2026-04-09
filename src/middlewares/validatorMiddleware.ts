import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { data, success, error } = schema.safeParse(req.body);

    if (!success) {
      throw error;
    }

    req.body = data;
    next();
  };
};
