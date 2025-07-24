import { ILogin } from "@/app/utils/bodyPostREquestType/bodyPostREquestType";
import { LoginDto } from "@/app/utils/SchemaDto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import bcrypt from "bcryptjs";
import { Password } from "@mui/icons-material";
import { User } from "@prisma/client";
/**
 * @method POST
 * @route ~/api/user/login
 * @description (log in /sign in)  user
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ILogin;
    const validation = LoginDto.safeParse(body);
   console.log("validation is : ",validation);
   
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message },{status:404});
    }
    const email = body.email;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "invalid passaword or email" },
        { status: 404 }
      );
    }
    const isMatchPassword = await bcrypt.compare(body.password, user.password);
    if (!isMatchPassword) {
      return NextResponse.json(
        { message: "invalid passaword or email" },
        { status: 404 }
      );
    }
    const token = null;

    return NextResponse.json({ message: "Authenticated", token });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
