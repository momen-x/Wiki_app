import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";    
import { z } from 'zod';
import { UpdateCommentSchema, UpdateCommentSchemaType } from "@/app/(Modules)/_Comments/Validation/CreateAndEditComment";
import auth from "@/auth";
interface IProps {
  params: Promise<{ id: string }>;
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
export async function PUT(request: NextRequest, { params }: IProps) {
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "the id is  incorrect" },
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
    const body = (await request.json()) as UpdateCommentSchemaType;
    const validation = UpdateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 403 }
      );
    }
   const session=await auth();
    if (!session || Number(session.user.id) !== Comment.userId) {
      return NextResponse.json(
        { message: "u are not allowed to edit this comment , access denied" },
        { status: 403 }
      );
    }
    const updateComment = await prisma.comment.update({
      where: { id },
      data: { text: body.text }, // or { text: body.text } if you only want to update the text
    });
    return NextResponse.json(
      {
        message: "Comment updated",
        comment: updateComment,
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
export async function DELETE(request: NextRequest, { params }: IProps) {
  try {
    const id = +(await params).id;
    if (isNaN(id)) {
      NextResponse.json({ message: "the id is  incorrect" }, { status: 400 });
    }
    const Comment = await prisma.comment.findUnique({ where: { id } });
    if (!Comment) {
      return NextResponse.json(
        { message: "the comment is not found" },
        { status: 404 }
      );
    }

   const session=await auth();
    if (!session) {
      return NextResponse.json(
        { message: "Invalid token. Access denied." },
        { status: 401 }
      );
    }

    if (Number(session.user.id) !== Comment.userId && !session.user.isAdmin) {
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
