import { adminService } from "./admin.service.js";

export const adminController = async (req, res, next) => {
  try {
    const result = await adminService({
      userId: req.body.userId,
      adminId: req.user._id.toString(),
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
