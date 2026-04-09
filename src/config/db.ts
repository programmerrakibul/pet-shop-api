import { config } from "./config.js";
import mongoose, { type mongo, type ConnectOptions } from "mongoose";

const connectOptions: ConnectOptions = {
  dbName: config.DB_NAME || "pet-shop",
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.DB_URI, connectOptions);

    const db: mongo.Db | undefined = mongoose.connection.db;

    if (!db) {
      throw new Error("Failed to connect to the database.");
    }

    await db.admin().command({ ping: 1 });

    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    throw err;
  }
};
