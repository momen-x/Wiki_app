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

    // if (userFormToken.id === user?.id) {
    //   const commentIds: number[] = user.comments.map((c) => c.id);
    //   if (commentIds.length > 0) {
    //     await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
    //   }
    //   const articleIds: number[] = user.articles.map((a) => a.id);
    //   if (articleIds.length > 0) {
    //     await prisma.comment.deleteMany({ where: { id: { in: articleIds } } });
    //   }

    //   await prisma.user.delete({ where: { id } });
    //   return NextResponse.json(
    //     { message: "your acount has been deleted" },
    //     { status: 200 }
    //   );
    // }

    // Authorization: Check if the token user ID matches the profile ID
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
 * @description Get profile by id
 * @access private
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
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      NextResponse.json({ message: "the user is not found" }, { status: 404 });
    }
    const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value as string;
    const userFormToken = jwt.verify(
      token,
      process.env.PRIVATE_KEY as string
    ) as JwtPayload;
    if (userFormToken.id === user?.id) {
      const data = {
        username: user?.username,
        password: user?.password,
        email: user?.email,
      };
      return NextResponse.json({ message: data }, { status: 200 });
    }
    if (userFormToken.id !== id) {
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

    const body = (await request.json()) as IEditUserData;

    const validation = EditUserData.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const jwtToken = request.cookies.get("token");
    if (!jwtToken) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = jwtToken.value;
    let userFromToken: JwtPayload;

    try {
      userFromToken = jwt.verify(
        token,
        process.env.PRIVATE_KEY as string
      ) as JwtPayload;
    } catch (error) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    if (userFromToken.id !== id) {
      return NextResponse.json(
        { message: "Unauthorized: You can't edit this account" },
        { status: 403 }
      );
    }

    //===========This code from cluade=====================
    const updateData: Partial<IEditUserData> = { ...body };
    // Only hash password if it's being updated
    if (body.password && body.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(body.password, salt);
    } else {
      // Remove password from update data if not provided
      delete updateData.password;
    }
if(body.username&&body.username?.trim()!=="")
  {
    const user =await prisma.user.findUnique({where:{username:body.username}});
    if(user){
       return NextResponse.json(
        { message: "this username alreday taken" },
        { status: 400 }
      );
    }
  }
if(body.email&&body.email?.trim()!=="")
  {
    const user =await prisma.user.findUnique({where:{email:body.email}});
    if(user){
       return NextResponse.json(
        { message: "this email alreday taken" },
        { status: 400 }
      );
    }
  }


    //===========This code from cluade=====================

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
