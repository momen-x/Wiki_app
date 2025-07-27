import { prisma } from "@/app/utils/db";
// import { error, log } from "console";
import { NextRequest, NextResponse } from "next/server";

interface Iprops {
  params: { id: string };
}
import { IEditArticle } from "@/app/utils/SchemaDto";
/**
 *@method GEt
 * @route ~/api/articles/:id
 * @desc Display single article
 * @access public
 */
export async function GET(request: NextRequest, { params }: Iprops) {
  try {
    const id = +params.id;
    if (isNaN(id)) {
      return NextResponse.json("this article is not exist", { status: 404 });
    }
    const article = await prisma.article.findUnique({ where: { id: id } });

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
 * @desc Edit  article
 * @access private
 */
export async function PUT(request: NextRequest, { params }: Iprops) {
  try {
    const id = +params.id;
    if (isNaN(id)) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    const body = await request.json();
    const validation = IEditArticle.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    // Find the article
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
 *@method DELETE
 * @route ~/api/articles/:id
 * @desc Delete article
 * @access private
 */
export async function DELETE(request: NextRequest, { params }: Iprops) {
  try {
    const id = +params.id;
    if (isNaN(id)) {
      return NextResponse.json("this article is not exist", { status: 404 });
    }
const article = await prisma.article.findUnique({
  where: { id },
  include: { comments: true },
});

if (!article) {
  return NextResponse.json("this article is not exist", { status: 404 });
}

const commentIds: number[] = article.comments.map(comment => comment.id);

if (commentIds.length > 0) {
  await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
}

await prisma.article.delete({
  where: { id }
});

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json("internal error", { status: 500 });
  }
}
