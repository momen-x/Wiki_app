import { prisma } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface Iprops {
  params: { id: string };
}

/**
 * @method GET
 * @route ~/api/users/:id
 * @description Get username (only logged-in user can see their own account)
 * @access public (should be private based on your description)
 */
export async function GET(request: NextRequest, { params }: Iprops) {
  try {
    const id = +params.id;
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Verify the token first
    const jwtToken = request.cookies.get("token")?.value;
    if (!jwtToken) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(
        jwtToken,
        process.env.PRIVATE_KEY as string
      ) as { id: number };
    } catch (error) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
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
    console.error("Error in GET /api/users/[id]:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
