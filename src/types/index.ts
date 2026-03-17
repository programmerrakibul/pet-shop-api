import { Document } from "mongoose";
import type z from "zod";
import type { petSchemaZ } from "../validators/petsValidator.js";

export type TPet = z.infer<typeof petSchemaZ> & {
  updatedAt: Date;
  createdAt: Date;
};

export interface TPetDocument extends TPet, Document {}

export interface TUser {
  name?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  role: "user" | "admin";
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoggedIn: Date;
}

export interface TUserDocument extends TUser, Document {}
