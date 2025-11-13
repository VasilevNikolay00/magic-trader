// In middleware.js (at the root of your project)

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/account", "/collection"];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("jwt");
  const secretString = process.env.JWT_SECRET;
  const loginUrl = new URL("/login", request.url);

  if (!cookie?.value || !secretString) {
    console.log("No JWT found, redirecting to login.");
    return NextResponse.redirect(loginUrl);
  }

  // 4. If a token exists, verify it
  try {
    const secret = Buffer.from(secretString, "base64");
    await jwtVerify(cookie.value, secret);
  } catch (error) {
    console.error("JWT Verification failed in middleware:", error.message);

    return NextResponse.redirect(loginUrl);
  }
}

// Your existing matcher is fine. It runs the middleware on all pages except static assets.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
