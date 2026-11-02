import "dotenv/config";
import express from "express";
import { connectMongo } from "./database/mongo.js";
import { connectRedis } from "./database/redis.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { errorMiddleware } from "./common/middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use(errorMiddleware);

const bootstrap = async () => {
  await connectMongo();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

bootstrap();
