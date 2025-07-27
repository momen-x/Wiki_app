// app/api/article/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import { createArticleSchema } from "@/app/utils/SchemaDto";
import { verifyToken } from "@/app/utils/verifyToken";

interface IArticleDto {
  title: string;
  description: string;
}
/**
 * @method GET
 * @route ~/api/articles
 * @description Display all articles
 * @access public
 */
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @description Create new article By logged useer
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Access denied. No token provided." },
        { status: 401 }
      );
    }

    const decoded = verifyToken(request);

    if (!decoded?.id) {
      return NextResponse.json({ message: "Invalid token." }, { status: 401 });
    }

    const body = (await request.json()) as IArticleDto;
    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
        userId: decoded.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
