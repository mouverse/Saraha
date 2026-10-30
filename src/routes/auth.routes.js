import { Router } from "express";
import { validate } from "../common/middlewares/validate.middleware.js";
import { registerValidator } from "../validators/register.validator.js";
import { registerController } from "../register/register.controller.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerValidator), registerController);

export default authRoutes;
