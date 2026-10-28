import z from "zod";

export const NodeEnv = {
  DEVELOPMENT: "development",
  TEST: "test",
  PRODUCTION: "production",
} as const;

export const envSchema = z.object({
  NODE_ENV: z.preprocess(
    (val) => {
      if (typeof val !== "string") return val;

      return val.trim().toLowerCase();
    },

    z.enum(
      Object.values(NodeEnv),
      "Invalid NODE_ENV format in the environment variables!",
    ),
  ),

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

  PORT: z.coerce
    .number("Invalid PORT format in the environment variables!")
    .positive()
    .default(8000),

  CLIENT_URL: z
    .string("Invalid CLIENT_URL format in the environment variables!")
    .trim()
    .default("http://localhost:5137"),

  ALLOWED_ORIGINS: z.preprocess((val) => {
    if (typeof val !== "string") return val;

    return val.trim().replaceAll(" ", "").split(",");
  }, z.array(z.url().trim())),

  SALT_ROUND: z
    .string("Invalid SALT_ROUND format in the environment variables!")
    .trim()
    .transform((val) => parseInt(val, 10) || 10)
    .default(10),

  REDIS_USERNAME: z
    .string()
    .trim()
    .min(1, "REDIS_USERNAME is not defined in the environment variable!"),

  REDIS_PASSWORD: z
    .string()
    .trim()
    .min(1, "REDIS_PASSWORD is not defined in the environment variable!"),

  REDIS_HOST: z
    .string()
    .trim()
    .min(1, "REDIS_HOST is not defined in the environment variable!"),

  REDIS_PORT: z.coerce
    .number()
    .positive("REDIS_PORT must be a positive number"),
});
