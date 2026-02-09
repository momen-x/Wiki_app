import DeleteAndEditButton from "@/app/(Modules)/admindashboard/_Components/DeleteAndEditButton";
import { domain_name } from "@/app/utils/Domain";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Article_In_All_Page } from "@/app/utils/CountOfArticleInPage";
import auth from "@/auth";

interface IArticle {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: {
    id: number;
    username: string;
  };
}

interface IPaginationData {
  articles: IArticle[];
  totalPages: number;
  currentPage: number;
  totalArticles: number;
}

interface ArticleAdminPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const ArticleAdminPage = async ({ searchParams }: ArticleAdminPageProps) => {
  //verification
const session =await auth();

  if (!session || !session.user.isAdmin) {
    redirect("/");
  }

  const currentPage = Number((await searchParams)?.page) || 1;

  // Fetch articles with pagination data
  const response = await fetch(
    `${domain_name}/api/articles?page=${currentPage}&limit=${Article_In_All_Page}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data: IPaginationData = await response.json();

  const { articles, totalPages, totalArticles } = data;

  // Pagination component
  const PaginationControls = () => {
    const generatePageNumbers = () => {
      const pages: (number | string)[] = [];
      const maxVisiblePages = 5; // Show up to 5 pages
      let startPage = 1;
      let endPage = totalPages;

      if (totalPages > maxVisiblePages) {
        const half = Math.floor(maxVisiblePages / 2);
        startPage = Math.max(1, currentPage - half);
        endPage = Math.min(totalPages, currentPage + half);

        if (currentPage - half < 1) {
          endPage = maxVisiblePages;
        } else if (currentPage + half > totalPages) {
          startPage = totalPages - maxVisiblePages + 1;
        }
      }

      // Always show first page
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Always show last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }

      return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        {/* Previous Button */}
        <Link
          href={`?page=${Math.max(1, currentPage - 1)}`}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
            currentPage <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 dark:bg-gray-700 dark:text-gray-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          aria-disabled={currentPage <= 1}
        >
          Prev
        </Link>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          ) : (
            <Link
              key={pageNum}
              href={`?page=${pageNum}`}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                pageNum === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {pageNum}
            </Link>
          ),
        )}

        {/* Next Button */}
        <Link
          href={`?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
            currentPage >= totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 dark:bg-gray-700 dark:text-gray-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          aria-disabled={currentPage >= totalPages}
        >
          Next
        </Link>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Article Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage all articles in the system
              </p>
            </div>
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Total: <span className="font-semibold">{totalArticles}</span>{" "}
                articles
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                    Created at
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="text-lg">No articles found</p>
                        <p className="text-sm mt-1">
                          Create your first article to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr
                      key={article.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="text-gray-800 dark:text-white font-medium">
                            {article.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                            {article.description.substring(0, 100)}...
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <DeleteAndEditButton
                          id={+session.user?.id}
                          userId={article.userId}
                          articleId={article.id}
                          title={article.title}
                          description={article.description}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && <PaginationControls />}
      </div>
    </main>
  );
};

export default ArticleAdminPage;
