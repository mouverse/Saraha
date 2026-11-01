import { forgetPasswordService } from "./forget-password.service.js";

export const forgetPasswordController = async (req, res, next) => {
  try {
    const result = await forgetPasswordService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
