import { cookies } from "next/headers";
import React from "react";
import { verifyTokenForPage } from "../utils/verifyToken";
import { domin_name } from "../utils/DOMIN";
import { Toaster } from "sonner";

import TuneTwoToneIcon from "@mui/icons-material/TuneTwoTone";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import AdminDeleteAndEditButton from "../components/AdminDeleteAndEditButton";

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
  const router=useRouter();
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");
  const id = payload?.id;
  if (token === undefined) {
    redirect("/");
  }
  try {
    const response = await fetch(`${domin_name}/api/users/profile/${id}`, {
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
        <Link
          href={"/profile/profileSettings"}
          className="bg-sky-300 p-3  my-3.5 rounded-xl "
        >
          Privacy settings : <TuneTwoToneIcon />
        </Link>
        <Toaster position="top-right" richColors />

        <h1 className="text-3xl font-bold text-gray-800 mb-10 mt-4">
          User Profile
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Username</p>
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Articles</h2>

        {data.articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              You haven't written any articles yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="w-4xl mx-4 h-28 ">
                  <AdminDeleteAndEditButton
                    id={payload?.id}
                    userId={payload?.id}
                    articleId={article.id}
                    title={article.title}
                    description={article.description}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <p className="text-sm text-gray-400">
                    Last updated: {new Date(article.updatedAt).toLocaleString()}
                  </p>
                </div>

                {article.comments.length > 0 && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Comments ({article.comments.length})
                    </h4>
                    <div className="space-y-3">
                      {article.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-white p-3 rounded-md shadow-sm"
                        >
                          <p className="text-gray-800">{comment.text}</p>
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
          <button
            onClick={() =>router.refresh() }
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
