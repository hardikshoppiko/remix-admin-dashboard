import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAuth } from "../utils/requireAuth";
import { getProducts } from "../data/products";
import { cn } from "../lib/utils";
import { Package, Plus, Pencil, Trash2 } from "lucide-react";
import { Pagination } from "../components/ui/pagination";
import { Container } from "../components/ui/container";

export const meta = () => {
  return [
    { title: "Products - OpenCart Admin" },
    { name: "description", content: "Manage your products" }
  ];
};

export async function loader({ request }) {
  await requireAuth(request);
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const { products, totalPages, currentPage, totalItems } = getProducts(page);
  return json({ products, totalPages, currentPage, totalItems });
}

export default function Products() {
  const { products, totalPages, currentPage, totalItems } = useLoaderData();

  return (
    <Container>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your product catalog</p>
        </div>
        <Link
          to="/products/new"
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Link>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start gap-4">
                <img
                  className="h-16 w-16 rounded-lg object-cover"
                  src={product.image || "https://via.placeholder.com/64"}
                  alt={product.name}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/products/${product.id}/edit`}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={`/products/${product.id}/delete`} method="post">
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stock</p>
                      <p className="text-sm font-medium">{product.stock}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      SKU: <span className="font-medium">{product.sku}</span>
                    </div>
                    <span className={cn(
                      "px-2 text-xs font-semibold leading-5 rounded-full",
                      product.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}>
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product.image || "https://via.placeholder.com/40"}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{product.sku}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      product.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/products/${product.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Pencil className="w-4 w-4" />
                      </Link>
                      <form action={`/products/${product.id}/delete`} method="post">
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-gray-700 w-full sm:w-auto text-center sm:text-left">
          Showing {((currentPage - 1) * 5) + 1} to {Math.min(currentPage * 5, totalItems)} of {totalItems} items
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Container>
  );
} 