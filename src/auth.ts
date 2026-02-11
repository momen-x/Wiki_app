import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { authConfig } from "./auth.config";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },

  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.isAdmin = user.isAdmin ?? false;
      }
      //to update the session after the user update his username
      if (trigger === "update" && session) {
        token.name = session.name;
        token.username = session.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        const user = await prisma.user.findUnique({
          where: { id: +(token.id as string) },
        });
        if (user) {
          session.user.name = user.name;
          session.user.username = user.username;
          session.user.isAdmin = user.isAdmin;
        }
      }
      return session;
    },
    async signIn({ user, account }) {
      // Allow OAuth providers (Google, etc.)
      if (account?.provider !== "credentials") {
        return true;
      }

      // For credentials provider, check email verification
      if (!user.email) {
        return false;
      }

      const userFromDb = await prisma.user.findUnique({
        where: { email: user.email },
        select: { emailVerified: true },
      });

      // Block login if email not verified
      if (!userFromDb?.emailVerified) {
        // console.log("❌ Login blocked: Email not verified for", user.email);
        return false; // This will show an error to the user
      }

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      }
    },
  },
});

export default auth;

// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
//   ],
// };