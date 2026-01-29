import { cookies } from "next/headers";
import React from "react";
import { Toaster } from "sonner";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { domain_name } from "@/app/utils/Domain";
import DeleteAndEditButton from "@/app/(Modules)/admindashboard/_Components/DeleteAndEditButton";
import { Button } from "@/app/_Components/ui/button";
import { FolderLock } from "lucide-react";

interface ICommentOnArticlesUser {
  text: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface IUserArticle {
  title: string;
  description: string;
  id: number;
  comments: ICommentOnArticlesUser[];
  createdAt: string;
  updatedAt: string;
}

interface IUserProfile {
  id: number;
  username: string;
  email: string;
  articles: IUserArticle[];
  createdAt: string;
  updatedAt: string;
}

const ProfilePage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");
  const id = payload?.id;
  if (token === undefined) {
    redirect("/");
  }
  try {
    const response = await fetch(`${domain_name}/api/users/profile/${id}`, {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Failed to fetch profile. Status: ${response.status}`
      );
    }
    const r = await response.json();
    const data: IUserProfile = r.message;

    return (
      <div className="container mx-auto px-4 py-8 ">
        <Toaster position="top-right" richColors />
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-10 mt-4">
            User Profile
          </h1>
          <Link
            href={"/profile/profileSettings"}
            className="bg-sky-300 text-sky-800  dark:text-sky-100 p-3  dark:bg-sky-600 my-3.5 rounded-xl "
          >
            Privacy settings : <FolderLock size={18} />
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark-text-gray-200">
                Username
              </p>
              <p className="text-lg font-medium">{data.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-lg font-medium">
                {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-200">
          Your Articles
        </h2>

        {data.articles.length === 0 ? (
          <div className="bg-white dark:bg-gray-600 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              You haven't written any articles yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.articles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-gray-800 p-4 mb:rounded-lg shadow-md overflow-hidden"
              >
                <div className="w-4xl mx-4 h-28 ">
                  <DeleteAndEditButton
                    id={payload?.id || 0}
                    userId={payload?.id || 0}
                    articleId={article.id}
                    title={article.title}
                    description={article.description}
                    commentText={article.comments[0]?.text || ""}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {article.description}
                  </p>
                  <p className="text-sm text-gray-400">
                    Last updated: {new Date(article.updatedAt).toLocaleString()}
                  </p>
                </div>

                {article.comments.length > 0 && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-3">
                      Comments ({article.comments.length})
                    </h4>
                    <div className="space-y-3">
                      {article.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-white  dark:bg-gray-800 rounded-lg p-3 shadow-sm"
                        >
                          <p className="text-gray-800 dark:text-gray-200 mb-1">
                            {comment.text}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Posted on{" "}
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <Toaster position="top-right" richColors />
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Profile
          </h1>
          <p className="text-gray-600">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
          <Button
            // onClick={() =>router.refresh() }
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
