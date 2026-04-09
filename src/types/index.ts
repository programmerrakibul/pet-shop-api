import type { envSchema, NodeEnv } from "@/validators/envValidator.js";
import type { petSchemaZ } from "@/validators/petsValidator.js";
import type { userSchemaZ } from "@/validators/usersValidator.js";
import { Document } from "mongoose";
import type z from "zod";

export type TPet = z.infer<typeof petSchemaZ> & {
  updatedAt: Date;
  createdAt: Date;
};

export interface TPetDocument extends TPet, Document {}

export type TUser = z.infer<typeof userSchemaZ> & {
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoggedIn: Date;
};

export interface TUserDocument extends TUser, Document {}
export type TConfig = z.infer<typeof envSchema>;
export type TNodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv];
