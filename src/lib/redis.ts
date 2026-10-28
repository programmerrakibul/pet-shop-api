// import { config } from "@/config/config.js";
import { BasicClientSideCache, createClient } from "redis";

const cache = new BasicClientSideCache({
  evictPolicy: "LRU",
  maxEntries: 0,
  ttl: 5000,
});

export const redisClient = createClient({
  clientSideCache: cache,
  // username: config.REDIS_USERNAME,
  // password: config.REDIS_PASSWORD,
  // socket: {
  //   host: config.REDIS_HOST,
  //   port: config.REDIS_PORT,
  // },
});

redisClient.on("error", (err) => console.error(`Redis Client Error: ${err}`));

export const connectRedisClient = async () => {
  try {
    await redisClient.connect();
    const ready = redisClient.isReady;

    if (!ready) throw new Error("Error while connecting redis-client!");

    console.info("✅ Redis Client connected successfully!");
  } catch (error) {
    redisClient.destroy();

    throw new Error(`Error connecting redis-client: ${error}`);
  }
};
