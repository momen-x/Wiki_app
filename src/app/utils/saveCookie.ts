import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";


export function setCookie(JwtPayload: JwtPayload): string {
  const token = jwt.sign(JwtPayload, process.env.JWT_SECRET as string);
  const cookie = serialize(process.env.TOKEN_COOKIE_NAME as string, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, //30 days
  });
  return cookie;
}