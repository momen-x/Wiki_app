// middleware.ts
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                     req.nextUrl.pathname.startsWith('/register');
  
  // If user is authenticated and trying to access auth pages, redirect to home
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  // If user is not authenticated and trying to access protected pages, redirect to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}