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
      expires: new Date(Date.now() + 3600 * 1000), 
      email,
    },
  });

  return newVerificationToken;
};

export default generateVerificationToken;


export const generateResetPasswordToken=async(email:string)=>{
  const resetPasswordToken=await prisma.resetPasswordToken.findFirst({where:{email}});
  if(resetPasswordToken){
    await prisma.resetPasswordToken.delete({where:{id:resetPasswordToken.id}})
  }
  const newResetPasswordToken=await prisma.resetPasswordToken.create({data:{
    token:randomUUID(),
    expires:new Date(new Date().getTime()+3600*1000),
    email
  }})
  return newResetPasswordToken;
}

