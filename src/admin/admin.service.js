import { User } from "../user/user.model.js";
import { AppError } from "../common/errors/app-error.js";

export const adminService = async ({ userId, adminId }) => {
  if (userId === adminId) {
    throw new AppError("You cannot ban yourself", 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isBanned) {
    throw new AppError("User is already banned", 400);
  }

  user.isBanned = true;
  await user.save();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    isBanned: user.isBanned,
  };
};
