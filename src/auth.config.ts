import type { NextAuthConfig } from "next-auth";

 //to do  handle the register form and sure  the email user is unique then be sure if is correct  or not  and send email on his email 
 // add forgot password page and verification email page 
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith('/login') || 
                        nextUrl.pathname.startsWith('/register');

      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (!isLoggedIn && !isAuthPage) {
        return false; // Redirect to login
      }

      return true;
    },
  },
  providers: [], // Providers added in auth.ts only
} satisfies NextAuthConfig;

export default authConfig;