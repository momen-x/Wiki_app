import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";     // ✅ or wherever your prisma.ts lives
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import RegisterSchema, {
  RegisterSchemaType,
} from "@/app/(Modules)/(user)/register/_Validation/RegisterValidation";

/**
 * @method POST
 * @route ~/api/users/register
 * @description create new account (register , sign up)
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterSchemaType;
    const validation = RegisterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    const user1 = await prisma.user.findUnique({
      where: { username: body.username },
    });
    if (user || user1) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 400 }
      );
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { message: "the password is not matched" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });
    const jwtPayload = {
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    };
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
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
      { user: newUser },
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
