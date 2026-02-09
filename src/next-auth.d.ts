import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      username?: string | null;
      token?:JWT|null;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    name?: string | null;
    username?: string | null;
    isAdmin: boolean;
    token?:JWT;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    username?: string | null;
    isAdmin: boolean;
  }
}