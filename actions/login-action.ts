"use server";

import { z } from "zod";

import { loginSchema } from "@/schema/login-schema";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { LOGGED_IN } from "@/routes";

export const loginUser = async (values: z.infer<typeof loginSchema>) => {
  // login logic
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
      status: 400,
    };
  }

  const { phone, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      phone,
      password,
      redirectTo: LOGGED_IN,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
            status: 400,
          };

        default:
          return {
            message: "Something went wrong",
            status: 400,
          };
      }
    }
  }
};
