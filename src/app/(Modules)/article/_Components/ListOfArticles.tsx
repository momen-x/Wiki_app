"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Article_In_All_Page } from "../../../utils/CountOfArticleInPage";
import axios from "axios";
import { domain_name } from "../../../utils/Domain";
import { getCountOfArticles } from "../../../utils/GetFunctions";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/app/_Components/ui/button";

interface IArticleData {
  userId: number;
  id: number;
  title: string;
  description: string;
}
const ListOfArticlesContent = () => {
  const [searchInput, setSearchInput] = useState("");
  const [articles, setArticles] = useState<IArticleData[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNO = parseInt(searchParams.get("page") || "1", 10);



  // Function to show success toast
  const showSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to fetch articles
  const fetchArticles = async () => {
    setLoading(true);

    try {
      // Fixed: Use 'page' parameter to match your API
      const response = await axios.get(
        `${domain_name}/api/articles?page=${pageNO}&limit=${Article_In_All_Page}`,
      );

      // Handle the response properly - check the structure
      if (response.data.articles) {
        setArticles(response.data.articles);
      } else {
        setArticles(response.data);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      toast.error("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch article count
  const fetchCount = async () => {
    try {
      const count = await getCountOfArticles();
      setTotalArticles(count);
      setTotalPages(Math.ceil(count / Article_In_All_Page));
    } catch (error) {
      toast.error("Failed to load article count. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [pageNO]);



  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/article/search?searchText=${searchInput}`);
    }
  };

  const shortenText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Pagination component similar to your working admin page
  const PaginationControls = () => {
    const generatePageNumbers = () => {
      const pages: (number | string)[] = [];
      const maxVisiblePages = 5;
      let startPage = 1;
      let endPage = totalPages;

      if (totalPages > maxVisiblePages) {
        const half = Math.floor(maxVisiblePages / 2);
        startPage = Math.max(1, pageNO - half);
        endPage = Math.min(totalPages, pageNO + half);

        if (pageNO - half < 1) {
          endPage = maxVisiblePages;
        } else if (pageNO + half > totalPages) {
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
      <div className="flex items-center justify-center gap-2 mt-6">
        {/* Previous Button */}
        <Link
          href={`?page=${Math.max(1, pageNO - 1)}`}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
            pageNO <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 pointer-events-none"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Prev
        </Link>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) =>
          pageNum === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <Link
              key={pageNum}
              href={`?page=${pageNum}`}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                pageNum === pageNO
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </Link>
          )
        )}

        {/* Next Button */}
        <Link
          href={`?page=${Math.min(totalPages, pageNO + 1)}`}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
            pageNO >= totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 pointer-events-none"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Next
        </Link>
      </div>
    );
  };



  const articlesList = articles.map((article) => (
    <div
      key={article.id}
      className="max-w-4xl mx-auto mb-6 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-700"
    >
      <h3 className="text-xl font-bold  mb-2">{article.title}</h3>
      <p className=" mb-4">{shortenText(article.description)}</p>
      <Link
        href={`/article/${article.id}`}
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Read More
      </Link>
    </div>
  ));

  return (
    <>
      <form onSubmit={formSubmitHandler} className="max-w-4xl mx-auto mb-6">
        <div className="flex gap-2">
          <input
            value={searchInput}
            type="search"
            name="search"
            id="search"
            placeholder="Search articles"
            title="Search articles"
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            type="submit"
            className="px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors cursor-pointer"
          >
            Search
          </Button>
        </div>
      </form>
           


      {loading ? (
        <div className="max-w-4xl mx-auto text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading articles...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {articlesList.length > 0 ? (
            articlesList
          ) : (
            <div className="max-w-4xl mx-auto text-center py-8">
              <p className="text-gray-600">No articles found.</p>
            </div>
          )}

          {/* Pagination Controls using Link components */}
          {totalPages > 1 && <PaginationControls />}

          {/* Page Info */}
          {totalPages > 1 && (
            <div className="max-w-4xl mx-auto text-center mt-4">
              <p className="text-sm text-gray-600">
                Page {pageNO} of {totalPages} ({totalArticles} total articles)
              </p>
            </div>
          )}
        </div>
      )}
          
      {/* Toast Container */}
      <ToastContainer />

    </>
  );
};

// Wrapper component with Suspense
const ListOfArticles = () => {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      }
    >
      <ListOfArticlesContent  />
    </Suspense>
  );
};

export default ListOfArticles;
