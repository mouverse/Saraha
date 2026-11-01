import { resetPasswordService } from "./reset-password.service.js";

export const resetPasswordController = async (req, res, next) => {
  try {
    const result = await resetPasswordService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
