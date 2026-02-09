import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import EditAccountInformation from "./_Components/EditAccountInformation";
import auth from "@/auth";




const SettingProfilePage = async () => {
  // verification
const session =await auth();

  if (!session|| session.user.username===null) {
    redirect("/");
  }




  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
     <EditAccountInformation id={String(session.user.id)} />
    </div>
  );
};

export default SettingProfilePage;
