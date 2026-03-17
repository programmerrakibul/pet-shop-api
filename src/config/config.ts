import dotenv from "dotenv";

dotenv.config();

export const config = {
  DB_NAME: process.env.DB_NAME,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
  SALT_ROUND: process.env.SALT_ROUND,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
