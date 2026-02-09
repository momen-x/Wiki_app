import { prisma } from "@/lib/prisma";     
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

interface IProps {
  params: Promise<{ id: string }>;
}
//to do 

import { UpdateArticleSchema } from "@/app/(Modules)/article/_Validation/CreateAndEditArticleSchema";
/**
 *@method GEt
 * @route ~/api/articles/:id
 * @desc Display single article
 * @access public
 */
export async function GET(request: NextRequest, { params }: IProps) {
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
              select: { username: true,name:true },
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
export async function PUT(request: NextRequest, { params }: IProps) {
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
    
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "unauthorized" },
        { status: 401 }
      );
    }
 
      if (article?.userId !== parseInt(session.user.id)) {
        return NextResponse.json(
          { message: "u are not allowed to edit this comment , access denied" },
          { status: 403 }
        );
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
export async function DELETE(request: NextRequest, { params }: IProps) {
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

    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized: No session" },
        { status: 401 }
      );
    }

    // Fetch user to check for admin privileges
    const user = await prisma.user.findUnique({ where: { id: parseInt(session.user.id) } });

    // Check if user is either the author or an admin
    if (article.userId !== user?.id && !user?.isAdmin) {
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
    console.error("Delete article error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
