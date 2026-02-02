import React from "react";
import NotFound from "../_Components/not-found";
import { domain_name } from "@/app/utils/Domain";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import Link from "next/link";
import EditBtn from "./_Components/EditBtn";
import DeleteBtn from "./_Components/DeleteBtn";
import AddCommentInputs from "../../_Comments/Components/AddCommentInputs";
import ListOfComments from "../../_Comments/Components/ListOfComments";
import NotAuthUser from "../_Components/NotAuthUser";

interface IParams {
  params: Promise<{ id: string }>;
}

interface IComments {
  id: number;
  updatedAt: Date;
  text: string;
  user: { username: string };
  userId: number;
  articleId: number;
}

interface IArticleType {
  userId: number;
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
  comments: IComments[];
}

const DynamicPage = async ({ params }: IParams) => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");

  const id = (await params).id;

  if (isNaN(+id) || +id <= 0) {
    return <NotFound />;
  }

let username = "unknown";

try {
  const response = await fetch(`${domain_name}/api/articles/${id}`);
  if (!response.ok) return <NotFound />;

  const article: IArticleType = await response.json();
  const userinfo = await fetch(`${domain_name}/api/users/${article.userId}`);
  const userData = await userinfo.json();
  if (userData.message.username) {
    username = userData.message.username;
  }

  if (!article?.title) return <NotFound />;

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      {!payload?.id && 
            <NotAuthUser message="Please log in to add a comment on this article." />
      }
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
            {article.userId === payload?.id ? (
              <div className="mt-5 ml-3 w-2xl flex gap-2 ">
                <EditBtn article={article} />
                <DeleteBtn id={id} />
              </div>
            ) : (
              ""
            )}
            <div className="p-6 sm:p-8">
              <div className="mb-4">
                <Link
                  href={
                    article.userId === payload?.id
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

              <p className="text-lg leading-relaxed">{article.description}</p>
            </div>
          </div>

          <div className="mt-12">
            <div className="space-y-6">
            <h2 className="text-2xl font-semibold  mb-6">Comments  {"("} {article.comments?.length} {")"}</h2>
              {payload?.id &&
              
              <>
              <AddCommentInputs id={String(id)} />
              </>
              }
              <ListOfComments
                comments={article.comments || ([] as IComments[])}
                userId={payload?.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} catch {
  return <NotFound />;
}
};

export default DynamicPage;
