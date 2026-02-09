import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";     
import bcrypt from "bcryptjs";
import auth from "@/auth";

//it's so important to fix this code 




interface IProps {
  params: Promise<{ id: string }>;
}
/**
 * @method DELETE
 * @route ~/api/users/profile/[id]
 * @description Delete account by user themselves
 * @access private
 */
export async function DELETE(request: NextRequest, { params }: IProps) {
  try {
    const session = await auth();
    const id = +(await params).id;
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }
    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { comments: true, articles: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // const userFromToken = jwt.verify(
    //   jwtToken.value,
    //   process.env.JWT_SECRET as string
    // ) as JwtPayload;

    if (Number(session?.user.id) !== id && session.user.isAdmin === false) {
      return NextResponse.json(
        { message: "Unauthorized: You can only delete your own account" },
        { status: 403 },
      );
    }

    const password = request.headers.get("X-Password");
    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || "");
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "The password is not correct" },
        { status: 400 },
      );
    }

    await prisma.user.delete({ where: { id } });

    const response = NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 },
    );

    response.cookies.delete("token");
    return response;
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @description Get profile by id , every user can show the articles on the another users
 * @access public
 */
export async function GET(request: NextRequest, { params }: IProps) {
  try {
    const id = +(await params).id;
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
        name:true,
        email: true,
        createdAt: true,
        articles: {
          select: {
            title: true,
            description: true,
            updatedAt: true,
            id: true,
            comments: {
              select: { text: true, id: true, userId: true, createdAt: true },
            },
          },
        },
      },
    });
    if (!user) {
      NextResponse.json({ message: "the user is not found" }, { status: 404 });
    }



      return NextResponse.json({ message: user }, { status: 200 });
    
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
export async function PUT(request: NextRequest, { params }: IProps) {
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify the user is authorized to make changes
    // const jwtToken = request.cookies.get("token");
    // const token = jwtToken?.value as string;
    // const userFromToken = jwt.verify(
    //   token,
    //   process.env.JWT_SECRET as string
    // ) as JwtPayload;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 400 });
    }
    if (Number(session?.user.id) !== id) {
      return NextResponse.json(
        { message: "Unauthorized: You can only edit your own account" },
        { status: 403 },
      );
    }

    const body = await request.json();

    // Handle password change separately
    if (body.oldPassword && body.password) {
      const isPasswordValid = await bcrypt.compare(
        body.oldPassword,
        user.password || "",
      );
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 400 },
        );
      }

      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      delete body.oldPassword;
    }

    // Validate username uniqueness
    if (body.username && body.username?.trim() !== "") {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: body.username,
          NOT: { id },
        },
      });
      if (existingUser) {
        return NextResponse.json(
          { message: "This username is already taken" },
          { status: 400 },
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

    // Generate new token with updated user data
    // const newToken = jwt.sign(
    //   {
    //     id: updatedUser.id,
    //     username: updatedUser.username,
    //     email: updatedUser.email,
    //     isAdmin: updatedUser.isAdmin,
    //   },
    //   process.env.JWT_SECRET as string,
    //   { expiresIn: "30d" },
    // );

    // Prepare the response
    const response = NextResponse.json(
      {
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 },
    );

    // Set the new token in cookies
    // response.cookies.set({
    //   name: TOKEN_COOKIE_NAME,
    //   value: newToken,
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 60 * 60 * 24 * 30, // 30 days
    //   path: "/",
    // });

    return response;
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
