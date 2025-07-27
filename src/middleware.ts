import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value as string;
  // const authToken = request.headers.get("token") as string;
  if (!token) {
    return NextResponse.json(
      { message: "No token provided, access denied" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: "/api/user/profile/:path*",
};
