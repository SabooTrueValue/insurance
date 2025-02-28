import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from "./schema/user-schema";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  phone: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
