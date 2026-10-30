import "dotenv/config";
import express from "express";
import { connectMongo } from "./database/mongo.js";
import { connectRedis } from "./database/redis.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const bootstrap = async () => {
  await connectMongo();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

bootstrap();
