import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";     // ✅ or wherever your prisma.ts lives
import { verifyToken } from "@/app/utils/verifyToken"; // Adjust path as needed
import { ICreateComment } from "@/app/utils/bodyPostREquestType/bodyPostREquestType";
import { CreateCommentDto } from "@/app/utils/SchemaDto";



/**
 * @method POST
 * @route ~/api/comments
 * @description Create a new comment (only logged-in users)
 * @access private
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in to add comments" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as ICreateComment;
    const validation = CreateCommentDto.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const article = prisma.article.findUnique({
      where: { id: body.articleId },
    });
    if (!article) {
      NextResponse.json(
        { message: "the article is not exist" },
        { status: 404 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        userId: user.id, // Get user ID from verified token
        text: body.text,
        articleId: body.articleId,
      },
    });

    return NextResponse.json(
      {
        message: "Comment added successfully",
        comment: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @description Get all comments
 * @access private (only admin can read all comments)
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);

    // Check if user is not authenticated
    if (user === null) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    // Check if user is not admin
    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "Access denied: Only admins can view all comments" },
        { status: 403 }
      );
    }

    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Comments retrieved successfully",
        comments: comments,
        count: comments.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get all comments error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
