import { createClient } from "redis";

export const redisClient = createClient({ url: process.env.REDIS_URL });

export const connectRedis = async () => {
  redisClient.on("error", (error) => {
    console.error("Redis error:", error);
  });

  await redisClient.connect();
};
