import React from "react";
import NotFound from "../_Components/not-found";
import { domain_name } from "@/app/utils/Domain";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import ShowSingleArticle from "@/app/(Modules)/article/[id]/_Components/ShowSingleArticle";

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
    const response = await fetch(`${domain_name}/api/articles/${id}`);
    if (!response.ok) return <NotFound />;

    const article: IArticleType = await response.json();

    if (!article?.title) return <NotFound />;

    return (
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
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
