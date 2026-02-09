import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthenticated = !!req.auth; // auth is already available here!
  
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                     req.nextUrl.pathname.startsWith('/register');
  
  // If user is authenticated and trying to access auth pages, redirect to home
  if (isAuthenticated && isAuthPage) {
    return Response.redirect(new URL('/', req.url));
  }
  
  // If user is not authenticated and trying to access protected pages, redirect to login
  if (!isAuthenticated && !isAuthPage) {
    return Response.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};