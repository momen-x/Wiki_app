import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
}

export default function Pagination({ currentPage, totalPages, searchQuery }: PaginationProps) {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
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

  const buildUrl = (page: number): string => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    return `?${params.toString()}`;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous Button */}
      <Link
        href={buildUrl(Math.max(1, currentPage - 1))}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
          currentPage <= 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 pointer-events-none"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
        aria-disabled={currentPage <= 1}
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
            href={buildUrl(pageNum as number)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
              pageNum === currentPage
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
        href={buildUrl(Math.min(totalPages, currentPage + 1))}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 pointer-events-none"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </div>
  );
}