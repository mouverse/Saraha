import { Router } from "express";
import { authMiddleware } from "../common/middlewares/auth.middleware.js";
import { adminMiddleware } from "../common/middlewares/admin.middleware.js";
import { validate } from "../common/middlewares/validate.middleware.js";
import { banUserValidator } from "../validators/ban-user.validator.js";
import { adminController } from "../admin/admin.controller.js";

const adminRoutes = Router();

adminRoutes.post(
  "/ban",
  authMiddleware,
  adminMiddleware,
  validate(banUserValidator),
  adminController,
);

export default adminRoutes;
