import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import CreateArticle from "../article/_Components/CreateArticle";


const AdminPage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");

  if (!payload?.isAdmin) {
    redirect("/");
  }
  return (
    <div className="">
      <div
        className="flex justify-center items-center min-h-[calc(100vh-150px)] "
      >
        <div
 

          style={{
            width: "100%",
            maxWidth: 800,
            height: 400,
            maxHeight: "100%",
            padding: "16p",
          }}
        >
          <CreateArticle id={payload.id} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
