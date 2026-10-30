import { z } from "zod";

export const registerValidator = z.object({
  username: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["user", "admin"]).optional(),
});
