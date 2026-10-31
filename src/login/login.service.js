import { User } from "../user/user.model.js";
import { redisClient } from "../database/redis.js";
import { AppError } from "../common/errors/app-error.js";
import { comparePassword } from "../common/utils/password.js";
import { generateOtp } from "../common/utils/generate-otp.js";
import { signToken } from "../common/utils/jwt.js";

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (user.isBanned) {
    throw new AppError("User is banned", 403);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const otp = generateOtp();
  await redisClient.setEx(
    `2fa:${user._id}`,
    Number(process.env.OTP_TTL_SECONDS),
    otp,
  );

  const tempToken = signToken(
    { userId: user._id.toString(), type: "temp" },
    process.env.JWT_TEMP_EXPIRES_IN,
  );

  return { tempToken, otp };
};
