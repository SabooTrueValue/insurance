import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "@/schema/login-schema";
import { db } from "@/lib/db";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { phone, password } = validatedFields.data;

        const user = await db.user.findUnique({
          where: {
            phone,
          },
        });

        if (!user || !user.password) return null;

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return null;

        if (isValidPassword) {
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
