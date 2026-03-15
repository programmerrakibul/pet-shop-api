import dotenv from "dotenv";

dotenv.config();

export const config = {
  DB_NAME: process.env.DB_NAME,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV : process.env.NODE_ENV ,
};
