import NextAuth from "next-auth";
import { Role } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser: { role: Role; phone: string } | null =
        await db.user.findUnique({
          where: {
            id: token.sub,
          },
        });
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.phone = existingUser.phone;

      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.phone && session.user) {
        session.user.phone = token.phone as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
});
