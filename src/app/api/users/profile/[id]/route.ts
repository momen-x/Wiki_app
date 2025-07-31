import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IEditUserData } from "@/app/utils/bodyPostREquestType/bodyPostREquestType";
import { EditUserData } from "@/app/utils/SchemaDto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const TOKEN_COOKIE_NAME = "token";

interface Iprops {
  params: { id: string };
}
/**
 * @method DELETE
 * @route ~/api/users/profile/[id]
 * @description Delete account by user themselves
 * @access private
 */
export async function DELETE(request: NextRequest, { params }: Iprops) {
  try {
    const id = +params.id;
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { comments: true, articles: true },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value as string;
    const userFormToken = jwt.verify(
      token,
      process.env.PRIVATE_KEY as string
    ) as JwtPayload;

    if (userFormToken.id !== id) {
      return NextResponse.json(
        { message: "Unauthorized: You can only delete your own account" },
        { status: 403 }
      );
    }

    // Delete the user
    await prisma.user.delete({ where: { id } });
    cookies().delete(TOKEN_COOKIE_NAME);
    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Delete user error:", error);

    // Handle JWT specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ message: "Token expired" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @description Get profile by id , just loged user can see your acount
 * @access public
 */
export async function GET(request: NextRequest, { params }: Iprops) {
  try {
    const id = +params.id;
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "this user is not found" },
        { status: 404 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        // comments: true,
        id: true,
        username: true,
        email:true,
        createdAt:true,
        articles: {
          select: {
            title: true,
            description: true,
            updatedAt:true,
            id: true,
            comments: { select: { text: true, id: true, userId: true,createdAt:true } },
          },
        },
      },
    });
    if (!user) {
      NextResponse.json({ message: "the user is not found" }, { status: 404 });
    }
    const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value as string;

    if (token !== undefined) {
      return NextResponse.json({ message: user }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Unauthorized: You can't see this acount" },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/users/profile/[id]
 * @description edit account by user themselves
 * @access private
 */
export async function PUT(request: NextRequest, { params }: Iprops) {
  try {
    const id = +params.id;
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    // Handle password change separately
    if (body.oldPassword && body.password) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(body.oldPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 400 }
        );
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      delete body.oldPassword; // Remove oldPassword from update data
    }

    // Rest of your existing validation for username/email
    if (body.username && body.username?.trim() !== "") {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: body.username,
          NOT: { id }
        }
      });
      if (existingUser) {
        return NextResponse.json(
          { message: "This username is already taken" },
          { status: 400 }
        );
      }
    }

    if (body.email && body.email?.trim() !== "") {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: body.email,
          NOT: { id }
        }
      });
      if (existingUser) {
        return NextResponse.json(
          { message: "This email is already taken" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: body,
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


