import React from "react";
import { redirect } from "next/navigation";
import CreateArticle from "../article/_Components/CreateArticle";
import auth from "@/auth";


const AdminPage = async () => {
 
const session=await auth();
  if (!session || !session.user.isAdmin) {
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
          <CreateArticle id={session.user.id} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
