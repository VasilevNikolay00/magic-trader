// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretString = process.env.JWT_SECRET;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const cookie = request.cookies.get("jwt");

  if (pathname.startsWith("/api/logout")) {
    return NextResponse.next();
  }

  if (cookie && secretString) {
    try {
      const secret = Buffer.from(secretString, "base64");
      await jwtVerify(cookie.value, secret);

      return NextResponse.next();
    } catch (error) {
      // Token is invalid. Redirect to the logout API route to clear the bad cookie.
      console.error("JWT Verification failed in middleware:", error.mcooessage);

      const logoutUrl = request.nextUrl.clone();
      logoutUrl.pathname = "/api/logout";

      return NextResponse.redirect(logoutUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes, though we manually allow /api/logout above)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * This prevents the middleware from running on static assets and internal Next.js paths.
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
