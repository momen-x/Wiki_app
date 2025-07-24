import { createArticleSchema } from "@/app/utils/SchemaDto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../utils/db";
import { Article } from "@/generated/prisma";
interface IArticleDto {
  title: string;
  description: string;
}

/**
 *@method GEt
 * @route ~/api/article
 * @desc Display all articles
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const articles = await prisma.article.findMany();
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json("internal error", { status: 500 });
  }
}
/**
 *@method POST
 * @route ~/api/article
 * @desc create new article
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IArticleDto;

    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json("internal error", { status: 500 });
  }
}
