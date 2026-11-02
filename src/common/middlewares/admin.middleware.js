import { AppError } from "../errors/app-error.js";

export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      throw new AppError("Admin access required", 403);
    }

    next();
  } catch (error) {
    return res.status(error.statusCode || 403).json({ message: error.message });
  }
};
