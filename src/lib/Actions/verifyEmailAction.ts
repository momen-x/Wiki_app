"use server";

import prisma from "../prisma";
import { IReturnData } from "./type/ReturnData";



export const verifyEmailAction = async (token: string): Promise<IReturnData> => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token: token },
    });
    if (!verificationToken) {
      return { type: "error", message: "invalid token", open: true };
    }

    const isExpired = new Date(verificationToken.expires) < new Date();
    if (isExpired) {
      return { type: "error", message: "invalid token", open: true };
    }
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });
    if (!user) {
      return { type: "error", message: "invalid email", open: true };
    }
    await prisma.user.update({
      where: { email: verificationToken.email },
      data: {
        emailVerified: new Date(),
      },
    });
    await prisma.verificationToken.delete({
      where: {  email_token: {
          email: verificationToken.email,
          token: verificationToken.token,
        }, },
    });
    return { type: "success", open: true, message: "Success" };
  } catch (error) {
    console.log(error);
    return { type: "error", open: true, message: "Failed" };
  }
};
