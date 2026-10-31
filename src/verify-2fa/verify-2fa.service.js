import { redisClient } from "../database/redis.js";
import { AppError } from "../common/errors/app-error.js";
import { signToken, verifyToken } from "../common/utils/jwt.js";
import { User } from "../user/user.model.js";

export const verify2faService = async ({ tempToken, otp }) => {
  const payload = verifyToken(tempToken);

  if (payload.type !== "temp") {
    throw new AppError("Invalid temp token", 401);
  }

  const user = await User.findById(payload.userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isBanned) {
    throw new AppError("User is banned", 403);
  }

  const storedOtp = await redisClient.get(`2fa:${user._id}`);

  if (!storedOtp || storedOtp !== otp) {
    throw new AppError("Invalid or expired OTP", 401);
  }

  await redisClient.del(`2fa:${user._id}`);

  const accessToken = signToken(
    { userId: user._id.toString(), type: "access" },
    process.env.JWT_ACCESS_EXPIRES_IN,
  );

  return {
    accessToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};
