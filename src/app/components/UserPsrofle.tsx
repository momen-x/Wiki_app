"use client";
import { domain_name } from "@/app/utils/Domain";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { Toaster } from "@/components/ui/sonner";

interface IParams {
  id: string;
}

interface IUserProfile {
  id: number;
  username: string;
  email: string;
  articles: IUserArticle[];
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

interface ICommentOnArticlesUser {
  text: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const UserProfile = ({ id }: IParams) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${domain_name}/api/users/profile/${id}`,
        );

        if (!response.data) {
          throw new Error(
            `Failed to fetch profile. Status: ${response.status}`,
          );
        }

        const data: IUserProfile = response.data.message;
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* <Toaster position="top-right" richColors /> */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Profile
          </h1>
          <p className="text-gray-600">{error.message}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">No user data found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Toaster position="top-right" richColors /> */}

      <h1 className="text-3xl font-bold text-gray-800 mb-10 mt-4">
        User Profile
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-lg font-medium">{userData.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="text-lg font-medium">
              {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Articles ({userData.articles.length})
      </h2>

      {userData.articles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">
            This user hasn't written any articles yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {userData.articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <p className="text-sm text-gray-400">
                  Created: {new Date(article.createdAt).toLocaleString()}
                </p>
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
};

export default UserProfile;
