import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @method GET
 * @route ~/api/cron/cleanup-tokens
 * @description Clean up expired tokens and unverified users
 * @access Internal (add auth in production)
 */
export async function GET() {
  try {
    // Clean up expired tokens
    // const deletedTokens = await cleanupExpiredTokens();

    // Delete unverified users older than 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        emailVerified: null,
        createdAt: {
          lt: oneDayAgo,
        },
      },
    });

    return NextResponse.json({
      success: true,
      // deletedTokens,
      deletedUsers: deletedUsers.count,
    });
  } catch (error) {
    console.error("❌ Cleanup error:", error);
    return NextResponse.json(
      { error: "Cleanup failed" },
      { status: 500 }
    );
  }
}