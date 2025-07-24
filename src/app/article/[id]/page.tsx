import React from "react";
import NotFound from "../not-found";
import Link from "next/link";
import AddCommentInputs from "@/app/components/AddCommentInputs";
import ListOfComments from "@/app/components/ListOfComments";

interface IParams {
  params: { id: string };
}
interface IArticleType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DynamicPage = async ({ params }: IParams) => {
  const id = params.id;

  if (isNaN(+id) || +id <= 0) {
    return <NotFound />;
  }

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    if (!response.ok) {
      return <NotFound />;
    }

    const article: IArticleType = await response.json();

    // If the article is empty, show NotFound
    if (!article || !article.title) {
      return <NotFound />;
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              href="/article" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Articles
            </Link>
          </div>

          {/* Article card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
              
              <div className="flex items-center text-gray-500 mb-6">
                <span className="mr-4">Posted by User {article.userId}</span>
                {/* <span>Article ID: {article.id}</span> */}
              </div>
              
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">{article.body}</p>
                <p className="text-lg leading-relaxed mt-4">{article.body}</p> {/* Duplicated for demo */}
              </div>
            </div>

            {/* Article footer */}
            <div className="bg-gray-50 px-6 py-4 sm:px-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    Share
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="w-2xl m-auto">
          <AddCommentInputs/>

          </div>
          <div className="w-2xl m-auto">
            <ListOfComments/>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default DynamicPage;