import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import LoginSchema from "./app/(Modules)/(user)/login/_Validations/LoginValidation";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
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
        return false; // Will redirect to signIn page automatically
      }

      return true;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials);
        
        if (!validation.success) {
          return null;
        }

        const { email, password } = validation.data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          username: user.username,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;