import { prisma } from "@/app/utils/db";
import { NextResponse, NextRequest } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/count
 * @description get articles count
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ message: count }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
