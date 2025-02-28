import { Status } from "@prisma/client";
import { z } from "zod";

export const assignmentSchema = z.object({
  driverId: z.string(),
  count: z.number().default(0),
  customerName: z.string().min(4, {
    message: "Please enter customer name",
  }),
  customerPhone: z
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
  amount: z.string().min(1, {
    message: "Please enter a amount",
  }),
  visitReason: z
    .string({
      required_error: "Please select a reason",
    })
    .min(3, {
      message: "Please select a reason",
    }),
  startTime: z.string().datetime().optional(),
  startAddress: z.string().optional(),
  status: z.enum([Status.ASSIGNED, Status.PENDING, Status.COMPLETED]),
});

export const stepFormSchema = z.object({
  driverId: z.string(),
  // count: z.number().default(0),
  amount: z.string().min(1, {
    message: "Please enter a valid amount!",
  }),
  remarks: z.string().min(1, {
    message: "Please enter remarks",
  }),
  collectedAddress: z.string().optional(),
  collectedTime: z.string().datetime().optional(),
  image: z.string().url(),
  status: z.enum([Status.COMPLETED]),
});
