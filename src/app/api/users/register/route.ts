import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import RegisterSchema, {
  RegisterSchemaType,
} from "@/app/(Modules)/(user)/(auth)/register/_Validation/RegisterValidation";
import generateVerificationToken from "@/app/utils/generateVerificationToken";
import { sendVerificationEmail } from "@/lib/utils/email";

/**
 * @method POST
 * @route ~/api/users/register
 * @description Create new account with email verification
 * @access Public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterSchemaType;
    
    // Validate input
    const validation = RegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password, confirmPassword, username } = validation.data;

    // Check password match (if not in schema validation)
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "username";
      return NextResponse.json(
        { message: `This ${field} is already registered` },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        emailVerified: null, // Not verified yet
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    // Generate verification token
    const verificationToken = await generateVerificationToken(email);
    
    // ADD THESE DEBUG LOGS
    console.log("🔍 Full verification token object:", verificationToken);
    console.log("🔍 Token ID:", verificationToken.id);
    console.log("🔍 Token value:", verificationToken.token);
    console.log("🔍 What we're sending in email:", verificationToken.token);

    // Send verification email
    const emailResult = await sendVerificationEmail(
      email,
      verificationToken.token
    );

    if (!emailResult.success) {
      // If email fails, delete the user to maintain consistency
      await prisma.user.delete({ where: { id: newUser.id } });
      
      return NextResponse.json(
        { message: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    console.log("✅ User registered successfully:", newUser.email);
    console.log("📧 Verification link should contain token:", verificationToken.token);

    return NextResponse.json(
      { 
        message: "Registration successful! Please check your email to verify your account.",
        email: newUser.email,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}