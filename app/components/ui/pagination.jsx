import { Link } from "@remix-run/react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

export function Pagination({ currentPage, totalPages, baseUrl = "" }) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfMaxPages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfMaxPages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    if (startPage > 1) {
      pages.push(
        <Link
          key={1}
          to={`${baseUrl}?page=1`}
          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          1
        </Link>
      );
      if (startPage > 2) {
        pages.push(
          <span
            key="start-ellipsis"
            className="inline-flex items-center justify-center w-9 h-9 text-gray-500"
          >
            <MoreHorizontal className="h-4 w-4" />
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          to={`${baseUrl}?page=${i}`}
          className={cn(
            "inline-flex items-center justify-center w-9 h-9 rounded-md border text-sm font-medium",
            currentPage === i
              ? "border-blue-500 bg-blue-50 text-blue-600"
              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
          )}
        >
          {i}
        </Link>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span
            key="end-ellipsis"
            className="inline-flex items-center justify-center w-9 h-9 text-gray-500"
          >
            <MoreHorizontal className="h-4 w-4" />
          </span>
        );
      }
      pages.push(
        <Link
          key={totalPages}
          to={`${baseUrl}?page=${totalPages}`}
          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          {totalPages}
        </Link>
      );
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center space-x-1" aria-label="Pagination">
      <Link
        to={`${baseUrl}?page=${Math.max(1, currentPage - 1)}`}
        className={cn(
          "inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50",
          currentPage === 1 && "pointer-events-none opacity-50"
        )}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>
      {renderPageNumbers()}
      <Link
        to={`${baseUrl}?page=${Math.min(totalPages, currentPage + 1)}`}
        className={cn(
          "inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50",
          currentPage === totalPages && "pointer-events-none opacity-50"
        )}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
} 