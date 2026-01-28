import AdminDeleteAndEditButton from "@/app/components/AdminDeleteAndEditButton";
import Drawar from "@/app/components/Drawar";
import { domain_name } from "@/app/utils/Domain";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Article_In_All_Page } from "@/app/utils/CountOfArticleInPage";

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
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");

  if (!payload?.isAdmin) {
    redirect("/");
  }

  const currentPage = Number((await searchParams)?.page) || 1;

  // Fetch articles with pagination data
  const response = await fetch(
    `${domain_name}/api/articles?page=${currentPage}&limit=${Article_In_All_Page}`,
    {
      cache: "no-store",
      headers: {
        Cookie: `token=${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  const data: IPaginationData = await response.json();
  
  const {articles, totalPages, totalArticles } = data;

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
          pages.push('...');
        }
      }

      // Middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Always show last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }

      return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        {/* Previous Button */}
        <Link
          href={`?page=${Math.max(1, currentPage - 1)}`}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
            currentPage <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          aria-disabled={currentPage <= 1}
        >
          Prev
        </Link>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => (
          pageNum === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
          ) : (
            <Link
              key={pageNum}
              href={`?page=${pageNum}`}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                pageNum === currentPage
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </Link>
          )
        ))}

        {/* Next Button */}
        <Link
          href={`?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
            currentPage >= totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          aria-disabled={currentPage >= totalPages}
        >
          Next
        </Link>
      </div>
    );
  };

  return (
    <Drawar username={payload?.username}>
      <main className="flex min-h-screen  bg-gray-50 ml-50  w-6xl">
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur">
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Articles
            </h1>
            <p className="text-sm text-gray-600">
              {totalArticles} total articles
            </p>
          </header>

          <section className="p-4 sm:p-6 lg:p-8">
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <tr>
                    <th scope="col" className="px-3 py-3 sm:px-6">
                      Title
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-3 py-3 sm:px-6"
                    >
                      Created at
                    </th>
                    <th scope="col" className="px-3 py-3 text-right sm:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {articles.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-10 text-center text-gray-500 sm:px-6"
                      >
                        No articles yet.
                      </td>
                    </tr>
                  ) : (
                    articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="whitespace-normal px-3 py-4 text-gray-800 sm:px-6">
                          {article.title}
                        </td>
                        <td className="hidden whitespace-nowrap px-3 py-4 text-gray-600 md:table-cell sm:px-6">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-xs font-medium sm:px-6">
                          <AdminDeleteAndEditButton
                            id={payload?.id}
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


            {totalPages > 1 && <PaginationControls />}
          </section>
        </div>
      </main>
    </Drawar>
  );
};

export default ArticleAdminPage;
