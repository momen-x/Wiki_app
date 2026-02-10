"use server";

import { ResetPasswordSchema, ResetPasswordType } from "@/app/(Modules)/(user)/(auth)/reset-password/Validation/Resetpassword";
import prisma from "../prisma";
import { IReturnData } from "./type/ReturnData";
import bcrypt from 'bcryptjs';

export const resetPasswordToken = async (data:ResetPasswordType,token:string): Promise<IReturnData> => {
  try {
const validation=ResetPasswordSchema.safeParse(data);
if(!validation.success){
    return {type:"error",message:validation.error.issues[0].message}
}

const {newPassword}=validation.data;
const resetPassword=await prisma.resetPasswordToken.findUnique({where:{token}});
if(!resetPassword){
    return {type:"error",message:"token not found"}
}





    // Check if token is expired
    const now = new Date();
    const isExpired = new Date(resetPassword.expires) < now;

    if (isExpired) {
      await prisma.resetPasswordToken.delete({
        where: {
          token: resetPassword.token,
        },
      });


      return {
        type: "error",
        message: "Verification link has expired. Please register again.",
      };
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: resetPassword.email },
    });



    if (!user) {
      await prisma.resetPasswordToken.delete({
        where: {
          token: resetPassword.token,
        },
      });

      return {
        type: "error",
        message: "User not found. Please register again.",
      };
    }

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(newPassword,salt);
    await prisma.user.update({where:{id:user.id},
    data:{
        password:hashPassword,
        
    }})

    // Delete the reset password token
    await prisma.resetPasswordToken.delete({
      where: {
        token: resetPassword.token,
      },
    });

    // Mark email as verified if not already verified
    if (!user.emailVerified) {
      await prisma.user.update({
        where: { email: resetPassword.email },
        data: { emailVerified: new Date() },
      });
    }

    return {
      type: "success",
      message: "Password reset successfully! You can now log in.",
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