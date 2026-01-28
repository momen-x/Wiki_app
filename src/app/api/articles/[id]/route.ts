import { prisma } from "@/lib/prisma";     
import { NextRequest, NextResponse } from "next/server";

interface Iprops {
  params: Promise<{ id: string }>;
}
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/app/utils/verifyToken";
import { UpdateArticleSchema } from "@/app/(Modules)/article/_Validation/CreateAndEditArticleSchema";
/**
 *@method GEt
 * @route ~/api/articles/:id
 * @desc Display single article
 * @access public
 */
export async function GET(request: NextRequest, { params }: Iprops) {
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      return NextResponse.json("this article is not exist", { status: 404 });
    }
    const article = await prisma.article.findUnique({
      where: { id: id },
      include: {
        comments: {
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json("this article is not exist", { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json("internal error", { status: 500 });
  }
}
/**
 *@method PUT
 * @route ~/api/articles/:id
 * @desc Edit  article by user themselves
 * @access private
 */
export async function PUT(request: NextRequest, { params }: Iprops) {
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    const body = await request.json();
    const validation = UpdateArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const article = await prisma.article.findUnique({ where: { id } })
    const va = verifyToken(request);
    if (!va) {
      return NextResponse.json(
        { message: "u are not allowed to edit this comment , access denied" },
        { status: 403 }
      );
    } else {
      if (article?.userId !== va.id) {
        return NextResponse.json(
          { message: "u are not allowed to edit this comment , access denied" },
          { status: 403 }
        );
      }
    }

    const editArticle = await prisma.article.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(editArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc Delete article by user themselves or by admin
 * @access private
 */
export async function DELETE(request: NextRequest, { params }: Iprops) {
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid article ID" },
        { status: 400 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    // Verify JWT token
    const jwtToken = request.cookies.get("token");
    if (!jwtToken) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = jwtToken.value;
    const userFromToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Check if user is either the author or an admin
    if (article.userId !== userFromToken.id && !userFromToken.isAdmin) {
      return NextResponse.json(
        {
          message:
            "Forbidden: You can only delete your own articles or be an admin",
        },
        { status: 403 }
      );
    }

    // Delete the article
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Article deleted successfully",
        deletedArticle: article,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ message: "Token expired" }, { status: 401 });
    }

    console.error("Delete article error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
