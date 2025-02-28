import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .regex(/^(?:\+91|91)?[6789]\d{9}$/, {
      message: "Phone number must be a valid number.",
    })
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .max(10, {
      message: "Phone number must be at most 10 characters.",
    }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});
