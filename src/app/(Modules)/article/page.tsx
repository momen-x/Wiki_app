import { Suspense } from "react";
import { domain_name } from "@/app/utils/Domain";
import { Article_In_All_Page } from "@/app/utils/CountOfArticleInPage";
import SearchForm from "./_Components/SearchForm";
import ArticlesList from "./_Components/ArticlesList";
import Pagination from "./_Components/Pagination";
import CreateArticle from "./_Components/CreateArticle";
import NotAuthUser from "./_Components/NotAuthUser";
import auth from "@/auth";

interface IArticleData {
  userId: number;
  id: number;
  title: string;
  description: string;
}

interface ArticlesResponse {
  articles: IArticleData[];
  total: number;
  page: number;
  totalPages: number;
}

interface ArticlesPageProps {
  searchParams: { page?: string; search?: string };
}

async function fetchArticles(
  page: number,
  search?: string,
): Promise<ArticlesResponse> {
  try {
    const url = new URL(`${domain_name}/api/articles`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", Article_In_All_Page.toString());
    if (search) {
      url.searchParams.set("search", search);
    }

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  //verification

const session=await auth();

  const currentPage = Number((await searchParams).page) || 1;
  const searchQuery = (await searchParams).search || "";

  // Fetch articles on the server
  const { articles, total, totalPages } = await fetchArticles(
    currentPage,
    searchQuery,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {session && session.user.id ? (
        <>
          {/* Search Form - Client Component */}
          <SearchForm initialSearch={searchQuery} />
          {/* Add new Article form */}
          
          <CreateArticle id={session.user.id} />
        </>
      ) : (
        <NotAuthUser message="Please log in to add a new article." />
      )}
      {/* Articles List - Server Component */}
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading articles...</p>
          </div>
        }
      >
        <ArticlesList articles={articles} />
      </Suspense>

      {/* Pagination - Server Component */}
      {totalPages > 1 && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
          />
          <div className="max-w-4xl mx-auto text-center mt-4">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} ({total} total articles)
            </p>
          </div>
        </>
      )}
    </div>
  );
}
