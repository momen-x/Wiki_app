import { cookies } from "next/headers";
import Link from "next/link";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import ListOfArticles from "@/app/(Modules)/article/_Components/ListOfArticles";
import CreateArticle from "@/app/(Modules)/article/_Components/CreateArticle";
import { Lock } from "lucide-react";

const ArticlePage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");

  if (!payload) {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full mx-4">
        <div className=" rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16  rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Access Required
          </h1>

          <p className="text-gray-600 mb-8">
            Please log in to view and explore our articles
          </p>

          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Sign In to Continue
            </Link>

            <div className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Create one here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <CreateArticle id={payload?.id} />

        <h1 className="text-3xl font-bold  m-8 text-center">
          Search for article
        </h1>
        <ListOfArticles />
      </div>
    </div>
  );
  }

export default ArticlePage;
