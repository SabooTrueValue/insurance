import { z } from "zod";
import { Role } from "@prisma/client";

export const userSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
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
  email: z.string().optional(),
  role: z.enum([Role.ADMIN, Role.DRIVER]),
});

export const userExtendedSchema = userSchema.extend({
  showroomId: z.string().optional(),
  employeeId: z
    .string()
    .regex(/^[1-9][0-9]*$/, {
      message: "Employee Id must be a valid number.",
    })
    .min(4, {
      message: "Employee Id must be at least 4 characters.",
    })
    .max(4, {
      message: "Employee Id must be at most 4 characters.",
    })
    .optional(),
});

export const registerationSchema = userSchema.extend({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .max(10, {
      message: "Phone number must be at most 10 characters.",
    }),
  email: z.string().optional(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  role: z.enum([Role.ADMIN, Role.DRIVER]),
});
