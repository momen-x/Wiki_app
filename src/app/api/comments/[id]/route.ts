import { NextRequest, NextResponse } from "next/server";
import { Comment } from "../../../../generated/prisma/index";
import { prisma } from "@/app/utils/db";
import { IEditComment } from "@/app/utils/bodyPostREquestType/bodyPostREquestType";
import { EditCommentDto } from "@/app/utils/SchemaDto";
import { verifyToken } from "@/app/utils/verifyToken";
interface Iprops {
  params: { id: string };
}
/**
 * @method PUT
 * @route ~/api/comments/:id
 * @description edit comment by  writer this comment
 * @access private
 */
export async function PUT(request: NextRequest, { params }: Iprops) {
  try {
    const id = +params.id;
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
        { message: "u are not allowd to edit this post , access denied" },
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
    const id = +params.id;
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
    if (user === null || user.id !== Comment.userId) {
      return NextResponse.json(
        { message: "u are not allowd to edit this post , access denied" },
        { status: 403 }
      );
    }
    if (user.id === Comment.userId || user.isAdmin) {
      await prisma.comment.delete({ where: { id } });
      NextResponse.json(
        { message: "the comment has been deleted" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
