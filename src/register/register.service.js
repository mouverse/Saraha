import { User } from "../user/user.model.js";
import { AppError } from "../common/errors/app-error.js";
import { hashPassword } from "../common/utils/password.js";

export const registerService = async ({ username, email, password, role }) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new AppError("Email or username already exists", 409);
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};
