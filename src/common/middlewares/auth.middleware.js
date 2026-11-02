import { User } from "../../user/user.model.js";
import { AppError } from "../errors/app-error.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }

    const token = header.split(" ")[1];
    const payload = verifyToken(token);

    if (payload.type !== "access") {
      throw new AppError("Unauthorized", 401);
    }

    const user = await User.findById(payload.userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.isBanned) {
      throw new AppError("User is banned", 403);
    }

    req.user = user;
    next();
  } catch (error) {
    const statusCode = error.statusCode || 401;
    return res.status(statusCode).json({ message: error.message });
  }
};
