"use client";
import Link from "next/link";
import ArticlesErrorPage from "../article/error";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Article_In_All_Page } from "../utils/CountOfArticleInPage";
import axios from "axios";
import { domin_name } from "../utils/DOMIN";
import { getCountOfArticles } from "../utils/GetFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IArticleData {
  userId: number;
  id: number;
  title: string;
  description: string;
}

// Main component wrapped in Suspense to handle useSearchParams
const ListOfArticlesContent = () => {
  const [searchInput, setSearchInput] = useState("");
  const [addArticlehInput, setAddArticlehInput] = useState({
    title: "",
    description: "",
  });
  const [articles, setArticles] = useState<IArticleData[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use 'page' instead of 'pageNumber' to match your working admin page
  const pageNO = parseInt(searchParams.get("page") || "1", 10);

  // Function to show error toast
  const showError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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
    setError(false);

      try {
        const response = await axios.get(
          `${domin_name}/api/articles?pageNumber=${pageNO}`
        );
        setArticles(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(true);
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
      showError("Failed to load article count. Please refresh the page.");
      setError(true);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [pageNO]);

  const handelAddArticle = async () => {
    if (
      addArticlehInput.description.trim() === "" ||
      addArticlehInput.title.trim() === ""
    ) {
      showError("Please fill in both title and description fields.");
      return;
    }
    useEffect(() => {
      const fetchAddArticles = async () => {
        const body = {
          title: addArticlehInput.title,
          description: addArticlehInput.description,
          userId: 5,
        };
        try {
          setLoading(true);
          const response = await axios.post(
            `${domin_name}/api/api/articles`,
        (body)
          );
          console.log(response.data);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
    }, [addArticlehInput]);
  };
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== pageNO) {
      // Update URL with new page parameter
      const currentParams = new URLSearchParams(searchParams.toString());

      if (newPage === 1) {
        // Remove pageNumber parameter for page 1 (cleaner URLs)
        currentParams.delete("pageNumber");
      } else {
        currentParams.set("pageNumber", newPage.toString());
      }

      const newUrl = currentParams.toString()
        ? `${window.location.pathname}?${currentParams.toString()}`
        : window.location.pathname;

      router.push(newUrl);

      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots: (number | string)[] = [];

    // Handle edge case when totalPages is 1 or less
    if (totalPages <= 1) return [1];

    for (
      let i = Math.max(2, pageNO - delta);
      i <= Math.min(totalPages - 1, pageNO + delta);
      i++
    ) {
      range.push(i);
    }

    // Always include page 1
    rangeWithDots.push(1);

    // Add dots if there's a gap between 1 and the range
    if (pageNO - delta > 2) {
      rangeWithDots.push("...");
    }

    // Add the range (excluding page 1 if it's already there)
    range.forEach((page) => {
      if (page !== 1) {
        rangeWithDots.push(page);
      }
    });

    // Add dots and last page if there's a gap
    if (pageNO + delta < totalPages - 1) {
      rangeWithDots.push("...");
    }

    // Always include the last page (if it's not page 1)
    if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
      rangeWithDots.push(totalPages);
    }

    // Remove duplicates while preserving order
    return rangeWithDots.filter(
      (page, index, arr) => arr.indexOf(page) === index
    );
  };

  if (error) {
    return <ArticlesErrorPage />;
  }

  const articlesList = articles.map((arti) => (
    <div
      key={arti.id}
      className="max-w-4xl mx-auto mb-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{arti.title}</h3>
      <p className="text-gray-600 mb-4">{shortenText(arti.description)}</p>
      <Link
        href={`/article/${arti.id}`}
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Read More
      </Link>
    </div>
  ));

  return (
    <>
      <form onSubmit={formSubmitHandler} className="max-w-4xl mx-auto mb-6">
        <input
          value={searchInput}
          type="search"
          name="search"
          id="search"
          placeholder="Search articles"
          title="Search articles"
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="submit" className="bg-sky-300 ml-2 p-3 text-amber-50 rounded-2xl cursor-pointer">search</button>
      </form>

      <div className="max-w-4xl mx-auto mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Add New Article
        </h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="addTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Article Title
            </label>
            <input
              value={addArticlehInput.title}
              type="text"
              name="addTitle"
              id="addTitle"
              placeholder="Enter article title"
              onChange={(e) =>
                setAddArticlehInput({
                  ...addArticlehInput,
                  title: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={isAddingArticle}
            />
          </div>

          <div>
            <label
              htmlFor="addDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Article Description
            </label>
            <textarea
              value={addArticlehInput.description}
              name="addDescription"
              id="addDescription"
              rows={4}
              placeholder="Enter article description"
              onChange={(e) =>
                setAddArticlehInput({
                  ...addArticlehInput,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              disabled={isAddingArticle}
            />
          </div>

          <button
            onClick={handelAddArticle}
            disabled={
              !addArticlehInput.title.trim() ||
              !addArticlehInput.description.trim() ||
              isAddingArticle
            }
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAddingArticle ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Adding...
              </>
            ) : (
              "Add Article"
            )}
          </button>
        </div>
      </div>

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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="max-w-4xl mx-auto flex justify-center items-center space-x-2 mt-8">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(pageNO - 1)}
                disabled={pageNO === 1}
                className={`px-3 py-2 border rounded-md transition-colors ${
                  pageNO === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {getVisiblePages().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="px-2 py-2 text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                const pageNum = page as number;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 border rounded-md transition-all duration-200 ${
                      pageNum === pageNO
                        ? "bg-blue-500 text-white border-blue-500 shadow-md"
                        : "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 text-gray-700 hover:shadow-sm"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(pageNO + 1)}
                disabled={pageNO === totalPages}
                className={`px-3 py-2 border rounded-md transition-colors ${
                  pageNO === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="max-w-4xl mx-auto text-center mt-4">
              <p className="text-sm text-gray-600">
                Page {pageNO} of {totalPages} ({totalArticles} total articles)
              </p>
            </div>
          )}
        </div>
      )}
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
      <ListOfArticlesContent />
    </Suspense>
  );
};

export default ListOfArticles;