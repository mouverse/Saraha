import { User } from "../user/user.model.js";
import { redisClient } from "../database/redis.js";
import { AppError } from "../common/errors/app-error.js";
import { hashPassword } from "../common/utils/password.js";

export const resetPasswordService = async ({ email, otp, newPassword }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const storedOtp = await redisClient.get(`reset:${email}`);

  if (!storedOtp || storedOtp !== otp) {
    throw new AppError("Invalid or expired OTP", 401);
  }

  user.password = await hashPassword(newPassword);
  await user.save();
  await redisClient.del(`reset:${email}`);

  return { message: "Password reset successfully" };
};
