import { loginService } from "./login.service.js";

export const loginController = async (req, res, next) => {
  try {
    const result = await loginService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
