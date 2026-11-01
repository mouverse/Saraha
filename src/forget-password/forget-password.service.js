import { User } from "../user/user.model.js";
import { redisClient } from "../database/redis.js";
import { AppError } from "../common/errors/app-error.js";
import { generateOtp } from "../common/utils/generate-otp.js";

export const forgetPasswordService = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isBanned) {
    throw new AppError("User is banned", 403);
  }

  const otp = generateOtp();
  await redisClient.setEx(
    `reset:${email}`,
    Number(process.env.OTP_TTL_SECONDS),
    otp,
  );

  return { otp };
};
