import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";     
import bcrypt from "bcryptjs";
import auth from "@/auth";
import  {UpdateUserSchema,
  UpdateUserPassword,
} from "@/app/(Modules)/profile/profileSettings/_Validations/UpdateUserInfoValidation";





interface IProps {
  params: Promise<{ id: string }>;
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

    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (Number(session?.user.id) !== id) {
      return NextResponse.json(
        { message: "Unauthorized: You can only edit your own account" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    // Prepare data object for update
    const updateData: any = {};

    // Check if user wants to update password
    const passwordValidation = UpdateUserPassword.safeParse(body);
    if (passwordValidation.success) {
      
      const { oldPassword, newPassword } = passwordValidation.data;

      // Verify old password
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        user.password || ""
      );
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 400 }
        );
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    } else if (body.oldPassword || body.newPassword || body.confirmNewPassword) {
      // If any password field is present but validation failed, return the error
      return NextResponse.json(
        { 
          message: "Password validation failed",
          errors: passwordValidation.error.issues[0].message 
        },
        { status: 400 }
      );
    }

    // Check if user wants to update username
    const usernameValidation = UpdateUserSchema.safeParse(body);
    if (usernameValidation.success && body.username) {
      
      // Only check uniqueness if username is actually changing
      if (body.username !== user.username) {
        const existingUser = await prisma.user.findFirst({
          where: {
            username: body.username,
            NOT: { id },
          },
        });

        if (existingUser) {
          return NextResponse.json(
            { message: "This username is already taken" },
            { status: 400 }
          );
        }

        updateData.username = body.username;
      }
    } else if (body.username !== undefined && !usernameValidation.success) {
      // If username is present but validation failed, return the error
      return NextResponse.json(
        { 
          message: "Username validation failed",
          errors: usernameValidation.error.issues[0].message 
        },
        { status: 400 }
      );
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update" },
        { status: 400 }
      );
    }

    // Perform the update
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
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
