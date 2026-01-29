import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import EditAccountInformation from "./_Components/EditAccountInformation";




const SettingProfilePage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");
  const id = payload?.id;

  if (!token) {
    redirect("/");
  }




  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
     <EditAccountInformation id={id} />
    </div>
  );
};

export default SettingProfilePage;
