import { z } from "zod";

export const showroomSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  categoryId: z.string().min(2, {
    message: "Category is required",
  }),
});
