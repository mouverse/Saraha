import { z } from "zod";

export const banUserValidator = z.object({
  userId: z.string().min(1),
});
