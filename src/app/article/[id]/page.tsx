import React from "react";
import NotFound from "../not-found";
import { domin_name } from "@/app/utils/DOMIN";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import ShowSingleArticle from "@/app/components/ShowSingleArticle";

interface IParams {
  params: Promise<{ id: string }>;
}

interface IComments {
  id: number;
  updatedAt: Date;
  text: string;
  user: { username: string };
  userId: number;
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

  try {
    const response = await fetch(`${domin_name}/api/articles/${id}`);
    if (!response.ok) return <NotFound />;

    const article: IArticleType = await response.json();

    if (!article?.title) return <NotFound />;

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <ShowSingleArticle
          id={id}
          article={article}
          userId={payload?.id}
        />
      </div>
    );
  } catch {
    return <NotFound />;
  }
};

export default DynamicPage;
