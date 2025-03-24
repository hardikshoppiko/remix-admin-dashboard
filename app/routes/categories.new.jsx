import { Form, redirect, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAuth } from "../utils/requireAuth";
import { addCategory, getCategories } from "../data/categories";
import { Container } from "../components/ui/container";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export const meta = () => {
  return [
    { title: "Add Category - OpenCart Admin" },
    { name: "description", content: "Create a new product category" }
  ];
};

export async function loader({ request }) {
  await requireAuth(request);
  const categories = getCategories();
  return json({ categories });
}

export async function action({ request }) {
  await requireAuth(request);
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const parent_id = formData.get("parent_id");
  const status = formData.get("status");

  addCategory({
    name,
    description,
    parent_id: parent_id || null,
    status
  });

  return redirect("/categories");
}

export default function NewCategory() {
  const { categories } = useLoaderData();

  return (
    <Container>
      <div className="flex items-center mb-6">
        <a
          href="/categories"
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Category</h1>
          <p className="text-gray-500">Create a new product category</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Form method="post" className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <Select
                id="parent_id"
                name="parent_id"
              >
                <option value="">None</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                name="description"
                id="description"
                rows={3}
                placeholder="Enter category description"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select
                id="status"
                name="status"
                defaultValue="Active"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Category
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
} 