"use server"

import prisma from "@/lib/prisma";
import ForgotPassword, { ForgotPasswordType } from "../validations/forgotPassword"
import { IReturnData } from "@/lib/Actions/type/ReturnData";
import { generateResetPasswordToken } from "@/lib/utils/generateVerificationToken";
import { sendResendPasswordToken } from "@/lib/utils/email";

const forgotPassword=async (data:ForgotPasswordType) : Promise<IReturnData>=>{
    try {
        const validation=ForgotPassword.safeParse(data);
        if(!validation.success){
            return {type:"error",message:validation.error.issues[0].message}
        }
        const {email }=validation.data;
        const user =await prisma.user.findUnique({where:{email}});
        if(!user){
            return {type:"error",message:"user not found"}
        }
        const resetPassword=await generateResetPasswordToken(email);
              await sendResendPasswordToken(resetPassword.email,resetPassword.token)

        return {type:"success",message:"Resent password link sent , check your email"}
    } catch (error) {
        
        console.error("Forgot password error:", error);
        return { type: "error", message: "An unexpected error occurred" };
    }    
}

export default forgotPassword;