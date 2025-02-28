"use server";

import { db } from "@/lib/db";
import { registerationSchema } from "@/schema/user-schema";
import { hash } from "bcryptjs";
import { z } from "zod";

export const createAdmin = async (
  values: z.infer<typeof registerationSchema>
) => {
  const validatedFields = registerationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: [],
      message: "Please fill all the fields!",
      status: 400,
    };
  }

  const { name, email, phone, password, role } = validatedFields.data;
  const hashedPassword = await hash(password, 10);
  try {
    const user = await db.user.create({
      data: {
        name,
        phone,
        email,
        role,
        password: hashedPassword,
      },
    });
    return {
      message: "success",
      status: 200,
    };
  } catch (error) {}
};
