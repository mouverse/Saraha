import { Router } from "express";
import { validate } from "../common/middlewares/validate.middleware.js";
import { registerValidator } from "../validators/register.validator.js";
import { loginValidator } from "../validators/login.validator.js";
import { registerController } from "../register/register.controller.js";
import { loginController } from "../login/login.controller.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerValidator), registerController);
authRoutes.post("/login", validate(loginValidator), loginController);

export default authRoutes;
