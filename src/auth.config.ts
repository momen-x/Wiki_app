import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import LoginSchema from "./app/(Modules)/(user)/login/_Validations/LoginValidation";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
 const prisma = new PrismaClient();
 //to do  handle the register form and sure  the email user is unique then be sure if is correct  or not  and send email on his email 
 // add forgot password page and verification email page 
export default { providers: [
    Credentials({
      async authorize(data) {
        const validation = LoginSchema.safeParse(data);
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
           email: user.email,
          username: user.username ?? undefined,
          isAdmin: user.isAdmin,
          id: user.id.toString(),
        };
      },
    }),
    Google({
      clientId:process.env.GOOGLE_CLIENT_ID
      ,clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }),
  ],} satisfies NextAuthConfig