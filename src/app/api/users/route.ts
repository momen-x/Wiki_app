import auth from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/** 
 * @method GET
 * @description get all users by admin
 * @route ~/api/users
 * @access private just the admin can show all users
*/
export async function GET(){
    try {
        const session=await auth();
        if(!session){
            return NextResponse.json({message:"Unauthorized: Please log in"},{status:401});
        }
        if(!session.user.isAdmin){
            return NextResponse.json({message:"Access denied: Only admins can view all users"},{status:403})
        }
        const users= await prisma.user.findMany();
        return NextResponse.json(users,{status:200})
        
    } catch (error) {
          console.error("Get all comments error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    }
}