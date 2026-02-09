"use server";

import prisma from "../prisma";
import { IReturnData } from "./type/ReturnData";

export const verifyToken = async (token: string): Promise<IReturnData> => {
  try {
    console.log("🔍 ========== VERIFY TOKEN START ==========");
    console.log("🔍 Verifying token:", token);

    // Validate input
    if (!token || token.trim() === "") {
      console.log("❌ Token is empty");
      return {
        type: "error",
        message: "Invalid token provided",
        open: true,
      };
    }

    // Find the verification token
    console.log("🔍 Looking for token in database...");
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    console.log("📝 Found token?", verificationToken ? "YES" : "NO");
    if (verificationToken) {
      console.log("📝 Token details:", JSON.stringify(verificationToken, null, 2));
    }

    if (!verificationToken) {
      console.log("❌ Token not found in database");
      return {
        type: "error",
        message: "Invalid or expired verification link",
        open: true,
      };
    }

    // Check if token is expired
    const now = new Date();
    const isExpired = new Date(verificationToken.expires) < now;
    
    console.log("⏰ Current time:", now);
    console.log("⏰ Token expires:", verificationToken.expires);
    console.log("⏰ Is expired?", isExpired);

    if (isExpired) {
      console.log("❌ Token is expired, deleting...");
      await prisma.verificationToken.delete({
        where: {
          email_token: {
            email: verificationToken.email,
            token: verificationToken.token,
          },
        },
      });

      console.log("❌ Returning: Verification link has expired");
      return {
        type: "error",
        message: "Verification link has expired. Please register again.",
        open: true,
      };
    }

    // Find the user
    console.log("🔍 Looking for user:", verificationToken.email);
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });

    console.log("📝 Found user?", user ? "YES" : "NO");
    if (user) {
      console.log("📝 User emailVerified:", user.emailVerified);
    }

    if (!user) {
      console.log("❌ User not found, deleting token...");
      await prisma.verificationToken.delete({
        where: {
          email_token: {
            email: verificationToken.email,
            token: verificationToken.token,
          },
        },
      });

      console.log("❌ Returning: User not found");
      return {
        type: "error",
        message: "User not found. Please register again.",
        open: true,
      };
    }

    // Check if already verified
    if (user.emailVerified) {
      console.log("✅ User already verified, cleaning up token...");
      await prisma.verificationToken.delete({
        where: {
          email_token: {
            email: verificationToken.email,
            token: verificationToken.token,
          },
        },
      });

      console.log("✅ Returning: Email already verified");
      return {
        type: "success",
        message: "Email already verified. You can log in now.",
        open: true,
      };
    }

    // Update user as verified and delete token in a transaction
    console.log("✅ Verifying user now...");
    try {
      await prisma.$transaction([
        prisma.user.update({
          where: { email: verificationToken.email },
          data: { emailVerified: new Date() },
        }),
        prisma.verificationToken.delete({
          where: {
            email_token: {
              email: verificationToken.email,
              token: verificationToken.token,
            },
          },
        }),
      ]);
      console.log("✅ Transaction completed successfully!");
    } catch (txError) {
      console.error("❌ Transaction failed:", txError);
      throw txError;
    }

    console.log("✅ User verified successfully!");
    console.log("🔍 ========== VERIFY TOKEN END ==========");

    return {
      type: "success",
      message: "Email verified successfully! You can now log in.",
      open: true,
    };
  } catch (error) {
    console.error("❌ Token verification error:", error);
    return {
      type: "error",
      message: "An error occurred during verification. Please try again.",
      open: true,
    };
  }
};