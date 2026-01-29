"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { domain_name } from "../../../../utils/Domain";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditArticleDialog from "./EditArticleDialog";
import AddCommentInputs from "@/app/(Modules)/_Comments/Components/AddCommentInputs";
import ListOfComments from "@/app/(Modules)/_Comments/Components/ListOfComments";
import { Button } from "@/app/_Components/ui/button";

const ShowSingleArticle = ({ id, article, userId }: any) => {
  const router = useRouter();
  const handleDeleteArticle = async () => {
    if (confirm("are u sure u want delete this article")) {
      try {
        axios.delete(`${domain_name}/api/articles/${id}`);

        router.push("/article?pageNumber=1");
      } catch (error) {
        return;
      }
    }
  };
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("unknown");
  useEffect(() => {
    const fetch = async () => {
      try {

        const response = await axios.get(
          `${domain_name}/api/users/${article.userId}`,
        );
        const userData = await response.data.message.username;
        setUsername(userData);
      } catch (error) {
        return;
      }
    };
    fetch();
  }, []);
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/article?pageNumber=1"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Articles
        </Link>

        <div className=" rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800 bg-white">
          {article.userId === userId ? (
            <div className="mt-5 ml-3 w-2xl">
              {" "}
              <Button
                variant="default"
                color="primary"
                style={{ margin: "0 6px", width: "100px" }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                color="error"
                style={{ margin: "0 6px", width: "100px" }}
                onClick={handleDeleteArticle}
              >
                Delete
              </Button>
            </div>
          ) : (
            ""
          )}
          <div className="p-6 sm:p-8">
            <div className="mb-4">
              <Link
                href={
                  article.userId === userId
                    ? "/profile"
                    : `/userProfile/${article.userId}`
                }
              >
                <span className="text-sm font-semibold text-indigo-600 hover:underline">
                  @{username}
                </span>
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold  mb-4">
              {article.title}
            </h1>

            <p className="text-lg leading-relaxed">
              {article.description}
            </p>
          </div>
        </div>


        <div className="mt-12">
          <h2 className="text-2xl font-semibold  mb-6">
            Comments
          </h2>
          <div className="space-y-6">
            <AddCommentInputs id={id} />
            <ListOfComments comments={article.comments} userId={userId} />
          </div>
        </div>
      </div>
      <EditArticleDialog
        props={{
          id: article.id,
          userId: article.userId,
          open,
          setOpen,
          title: article.title,
          description: article.description,
        }}
      />
    </div>
  );
  {
  }
};

export default ShowSingleArticle;
