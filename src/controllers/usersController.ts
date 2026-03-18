import { User } from "../models/User.js";

import type { Request, Response, NextFunction } from "express";
import type { TUser } from "../types/index.js";
import type { TResponse } from "../types/response.js";

export const postUser = async (
  req: Request<{}, {}, TUser>,
  res: Response<TResponse<Omit<TUser, "password">>>,
  next: NextFunction,
) => {
  try {
    const newUser = new User(req.body);
    const { password, ...user } = (await newUser.save()).toObject();

    res.status(201).send({
      success: true,
      message: "User data created successfully!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
