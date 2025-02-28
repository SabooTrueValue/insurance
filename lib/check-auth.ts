"use server";
import { Role } from "@prisma/client";
import { auth } from "./auth";

export const checkAuthAndRole = async (roleRequired: Role) => {
  const session = await auth();
  if (!session) {
    return {
      data: [],
      message: "You are not authenticated!",
      status: 401,
    };
  }

  if (session.user.role !== roleRequired) {
    return {
      data: [],
      message: "You are not authorized to perform this action!",
      status: 403,
    };
  }

  return { session };
};
