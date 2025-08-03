import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const TOKEN_COOKIE_NAME = "token";

/**
 * @method GET
 * @route ~/api/users/logout
 * @description Log out user by clearing authentication token
 * @access private
 */
export async function GET(request: NextRequest) {
  try {
    (await cookies()).delete(TOKEN_COOKIE_NAME);
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
