import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../utils/db";
import { IRegister } from "@/app/utils/bodyPostREquestType/bodyPostREquestType";
import { RegisterAcount } from "@/app/utils/SchemaDto";
import bcrypt from "bcryptjs";
/**
 * @method POST
 * @route ~/api/user/register
 * @description creeate new acount (register , sign up)
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IRegister;
    const validation = RegisterAcount.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "this user alreday registerd" },
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
    const token = null;
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

    return NextResponse.json({ message: newUser, token });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
