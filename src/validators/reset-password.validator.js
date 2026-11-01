import { z } from "zod";

export const resetPasswordValidator = z.object({
  email: z.email(),
  otp: z.string().length(6),
  newPassword: z.string().min(6),
});
