import { z } from "zod";

export const forgetPasswordValidator = z.object({
  email: z.email(),
});
