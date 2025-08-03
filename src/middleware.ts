import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("token");
  const token = jwtToken?.value as string;
  // const authToken = request.headers.get("token") as string;
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
      return NextResponse.json(
        { message: "No token provided, access denied" },
        { status: 401 }
      );
    } else if (request.nextUrl.pathname === "/profile") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/user/profile/:path*", "/login", "/register", "/profile"],
};
