import { envSchema } from "@/validators/envValidator.js";
import dotenv from "dotenv";

dotenv.config();

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  const err = Object.values(error.issues)
    .map((issue) => issue.message)
    .join(", ");
  throw new Error(err);
}

export const config = data;
