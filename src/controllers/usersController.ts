import { User } from "../models/User.js";

import type { Request, Response, NextFunction } from "express";
import type { TUser } from "../types/index.js";
import type { TResponse } from "../types/response.js";

export const postUser = async (
  req: Request<{}, {}, TUser>,
  res: Response<TResponse<TUser>>,
  next: NextFunction,
) => {
  try {
    const userData = req.body;

    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      role: userData.role,
      verified: userData.verified,
    } as TUser);

    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User data created successfully!",
    });
  } catch (error) {
    next(error);
  }
};
