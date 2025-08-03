import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/utils/verifyToken";
import { prisma } from "@/lib/prisma";     // ✅ or wherever your prisma.ts lives
import { z } from 'zod';
interface Iprops {
  params: Promise<{ id: string }>;
}
 interface IEditComment {
  text: string;
}

export const EditCommentDto = z.object({
  text: z.string().min(1),
});
/**
 * @method PUT
 * @route ~/api/comments/:id
 * @description edit comment by  writer this comment
 * @access private
 */
export async function PUT(request: NextRequest, { params }: Iprops) {
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "the id is  uscorrect" },
        { status: 400 }
      );
    }
    const Comment = await prisma.comment.findUnique({ where: { id } });
    if (!Comment) {
      return NextResponse.json(
        { message: "the comment is not found" },
        { status: 404 }
      );
    }
    const body = (await request.json()) as IEditComment;
    const validation = EditCommentDto.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 403 }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== Comment.userId) {
      return NextResponse.json(
        { message: "u are not allowed to edit this comment , access denied" },
        { status: 403 }
      );
    }
    const ubdateComment = await prisma.comment.update({
      where: { id },
      data: { text: body.text }, // or { text: body.text } if you only want to update the text
    });
    return NextResponse.json(
      {
        message: "Comment updated",
        comment: ubdateComment,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @description delete comment by writer comment or by admin
 * @access private
 */
export async function DELETE(request: NextRequest, { params }: Iprops) {
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      NextResponse.json({ message: "the id is  uscorrect" }, { status: 400 });
    }
    const Comment = await prisma.comment.findUnique({ where: { id } });
    if (!Comment) {
      return NextResponse.json(
        { message: "the comment is not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid token. Access denied." },
        { status: 401 }
      );
    }

    if (user.id !== Comment.userId && !user.isAdmin) {
      return NextResponse.json(
        {
          message: "You are not allowed to delete this comment. Access denied.",
        },
        { status: 403 }
      );
    }
    await prisma.comment.delete({ where: { id } });

    return NextResponse.json(
      { message: "The comment has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
