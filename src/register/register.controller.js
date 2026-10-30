import { registerService } from "./register.service.js";

export const registerController = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
