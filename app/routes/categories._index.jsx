import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAuth } from "../utils/requireAuth";
import { getCategories } from "../data/categories";
import { cn } from "../lib/utils";
import { FolderPlus, Pencil, Trash2 } from "lucide-react";
import { Container } from "../components/ui/container";

export const meta = () => {
  return [
    { title: "Categories - OpenCart Admin" },
    { name: "description", content: "Manage your product categories" }
  ];
};

export async function loader({ request }) {
  await requireAuth(request);
  const categories = getCategories();
  return json({ categories });
}

export default function Categories() {
  const { categories } = useLoaderData();

  return (
    <Container>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500">Manage your product categories</p>
        </div>
        <Link
          to="/categories/new"
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <FolderPlus className="h-4 w-4 mr-2" />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    category.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  )}>
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/categories/${category.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <form action={`/categories/${category.id}/delete`} method="post">
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
    </Container>
  );
} 