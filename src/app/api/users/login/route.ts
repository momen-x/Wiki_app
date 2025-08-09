import { ILogin } from "@/app/utils/bodyPostREquestType/bodyPostREquestType";
import { LoginDto } from "@/app/utils/SchemaDto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";     // ✅ or wherever your prisma.ts lives
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

/**
 * @method POST
 * @route ~/api/users/login
 * @description (log in /sign in) user
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ILogin;
    const validation = LoginDto.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 } // Changed from 404 to 400 (Bad Request)
      );
    }

    const email = body.email;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const data={
      username:user?.username,
      email:user?.email,
      userId:user?.id
    }
    if (!user) {
      return NextResponse.json(
        { message: "Invalid password or email" },
        { status: 401 }
      );
    }

    const isMatchPassword = await bcrypt.compare(body.password, user.password);
    if (!isMatchPassword) {
      return NextResponse.json(
        { message: "Invalid password or email" },
        { status: 401 }
      );
    }

    const jwtPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, //30 days
    });

    return NextResponse.json(
      { message: "Authenticated", data },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
