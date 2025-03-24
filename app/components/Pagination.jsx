import { Link } from "@remix-run/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProduct, updateProduct, productCategories, addProduct } from "../data/products";

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage,
  baseUrl = "" // Optional base URL for pagination links
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between border-t pt-4">
      <div className="text-sm text-gray-700">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </div>
      <div className="flex items-center space-x-2">
        <Link
          to={`${baseUrl}?page=${currentPage - 1}`}
          prefetch="intent"
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              to={`${baseUrl}?page=${pageNum}`}
              prefetch="intent"
              className={`px-3 py-1 rounded-md ${
                pageNum === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </Link>
          ))}
        </div>

        <Link
          to={`${baseUrl}?page=${currentPage + 1}`}
          prefetch="intent"
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
} 