import { verify2faService } from "./verify-2fa.service.js";

export const verify2faController = async (req, res, next) => {
  try {
    const result = await verify2faService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
