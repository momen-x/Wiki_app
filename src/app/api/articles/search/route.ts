import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";     // ✅ or wherever your prisma.ts lives
import { Article_In_All_Page } from "@/app/utils/CountOfArticleInPage";

/**
 * @method GET
 * @route ~/api/articles/search
 * @description search about article
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let articles;
    if (searchText) {
      articles = await prisma.article.findMany({
        where: { title: { startsWith: searchText, mode: "insensitive" } },
      });
    } else {
      articles = await prisma.article.findMany({ take: Article_In_All_Page });
    }
    return NextResponse.json({ message: articles }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
