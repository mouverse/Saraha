import { Router } from "express";
import { validate } from "../common/middlewares/validate.middleware.js";
import { registerValidator } from "../validators/register.validator.js";
import { loginValidator } from "../validators/login.validator.js";
import { verify2faValidator } from "../validators/verify-2fa.validator.js";
import { forgetPasswordValidator } from "../validators/forget-password.validator.js";
import { registerController } from "../register/register.controller.js";
import { loginController } from "../login/login.controller.js";
import { verify2faController } from "../verify-2fa/verify-2fa.controller.js";
import { forgetPasswordController } from "../forget-password/forget-password.controller.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerValidator), registerController);
authRoutes.post("/login", validate(loginValidator), loginController);
authRoutes.post("/verify-2fa", validate(verify2faValidator), verify2faController);
authRoutes.post(
  "/forget-password",
  validate(forgetPasswordValidator),
  forgetPasswordController,
);

export default authRoutes;
