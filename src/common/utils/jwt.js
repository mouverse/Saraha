import jwt from "jsonwebtoken";
import { AppError } from "../errors/app-error.js";

export const signToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};
