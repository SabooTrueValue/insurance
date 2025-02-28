import authConfig from "@/lib/auth.config";
import { db } from "@/lib/db";

import NextAuth from "next-auth";

import {
  publicRoutes,
  apiAuthPrefix,
  LOGGED_IN,
  NOT_LOGGED_IN,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuth = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuth) return;

  if (!isLoggedIn && !isPublicRoute) {
    // let callbackUrl = new URL(LOGGED_IN, nextUrl);
    return Response.redirect(new URL(NOT_LOGGED_IN, nextUrl));
  }

  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL(LOGGED_IN, nextUrl));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
