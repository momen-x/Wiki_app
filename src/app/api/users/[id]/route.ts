import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";     // ✅ or wherever your prisma.ts lives
interface Iprops {
  params: Promise<{ id: string }>;
}

/**
 * @method GET
 * @route ~/api/users/:id
 * @description Get username (only logged-in user can see their own account)
 * @access private
 */
export async function GET(request: NextRequest, { params }: Iprops) {
  console.log("i am here");
  
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const jwtToken = request.cookies.get("token")?.value;
    console.log("jjjjj : ", jwtToken);

    if (!jwtToken) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
