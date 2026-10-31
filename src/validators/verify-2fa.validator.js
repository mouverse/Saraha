import { z } from "zod";

export const verify2faValidator = z.object({
  tempToken: z.string().min(1),
  otp: z.string().length(6),
});
