import prisma from "@/lib/prisma";
import { randomUUID } from "node:crypto";

const generateVerificationToken = async (email: string) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { email },
  });

  if (verificationToken) {
    await prisma.verificationToken.delete({
      where: {
        email_token: {
          email: verificationToken.email,
          token: verificationToken.token,
        },
      },
    });
  }

  const newVerificationToken = await prisma.verificationToken.create({
    data: {
      token: randomUUID(),
      expires: new Date(Date.now() + 3600 * 1000), // ✅ FIX: Add * 1000 for milliseconds
      email,
    },
  });

  return newVerificationToken;
};

export default generateVerificationToken;
// ```

// ## **The Issue:**

// - `3600` = 3600 milliseconds = **3.6 seconds** ❌
// - `3600 * 1000` = 3,600,000 milliseconds = **1 hour** ✅

// That's why your token was expiring immediately!

// ---

// ## **Now Test Again:**

// 1. **Update the file** with the fix above
// 2. **Delete the user** from database
// 3. **Register again**
// 4. **Click the verification link** - it should work now!

// You should see:
// ```
// ⏰ Current time: 2026-02-09T15:00:00.000Z
// ⏰ Token expires: 2026-02-09T16:00:00.000Z  ← Notice the 1 hour difference!
// ⏰ Is expired? false
// ✅ Verifying user now...
// ✅ Transaction completed successfully!