import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
// import  from "jsonwebtoken";

export function verifyToken(request: NextRequest): JwtPayload | null {
  try {
    const cookieName = "token";
    const jwtToken = request.cookies.get(cookieName);
    const token = jwtToken?.value;

    if (!token) {
      return null;
    }

    const privateKey = process.env.PRIVATE_KEY as string;
    const userPayload = jwt.verify(token, privateKey) as JwtPayload;

    return userPayload;
  } catch (error) {
    return null;
  }
}

export function verifyTokenForPage(token: string): JwtPayload | null {
  try {
    if (!token) return null;
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      return null;
    }
    const userPayload = jwt.verify(token, privateKey) as JwtPayload;
    return userPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
