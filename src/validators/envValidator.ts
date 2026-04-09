import z from "zod";
import type { TNodeEnv } from "../types/index.js";

export const NodeEnv = {
  DEVELOPMENT: "development",
  TEST: "test",
  PRODUCTION: "production",
} as const;

export const envSchema = z.object({
  NODE_ENV: z
    .enum(
      Object.keys(NodeEnv) as [TNodeEnv, ...TNodeEnv[]],
      "Invalid NODE_ENV format in the environment variables!",
    )
    .default("development"),
  DB_NAME: z
    .string("Invalid DB_NAME format in the environment variables!")
    .trim()
    .default("pet-shop"),
  DB_URI: z
    .string("DB_URI is not defined in the environment variables!")
    .trim()
    .min(1, "DB_URI is not defined in the environment variables!")
    .startsWith(
      "mongodb",
      "Invalid DB_URI format in the environment variables!",
    ),
  PORT: z
    .string("Invalid PORT format in the environment variables!")
    .trim()
    .transform((val) => parseInt(val, 10) || 8000)
    .default(8000),
  CLIENT_URL: z
    .string("Invalid CLIENT_URL format in the environment variables!")
    .trim()
    .default("http://localhost:5137"),
  SALT_ROUND: z
    .string("Invalid SALT_ROUND format in the environment variables!")
    .trim()
    .transform((val) => parseInt(val, 10) || 10)
    .default(10),
});
