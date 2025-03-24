import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { requireAuth } from "../utils/requireAuth";
import { getProduct, updateProduct } from "../data/products";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Container } from "../components/ui/container";

export const meta = () => {
  return [
    { title: "Edit Product - OpenCart Admin" },
    { name: "description", content: "Edit an existing product in your store" }
  ];
};

export async function loader({ request, params }) {
  await requireAuth(request);
  const product = getProduct(params.id);
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return json({ product });
}

export async function action({ request, params }) {
  await requireAuth(request);
  const formData = await request.formData();
  const productData = {
    id: parseInt(params.id),
    name: formData.get("name"),
    sku: formData.get("sku"),
    price: parseFloat(formData.get("price")),
    stock: parseInt(formData.get("stock")),
    category: formData.get("category"),
    status: formData.get("status"),
    description: formData.get("description"),
    image: formData.get("image")
  };

  // Validate required fields
  const errors = {};
  if (!productData.name) errors.name = "Name is required";
  if (!productData.sku) errors.sku = "SKU is required";
  if (!productData.price || isNaN(productData.price)) errors.price = "Valid price is required";
  if (!productData.stock || isNaN(productData.stock)) errors.stock = "Valid stock quantity is required";
  if (!productData.category) errors.category = "Category is required";
  if (!productData.status) errors.status = "Status is required";

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const updatedProduct = updateProduct(productData);
  if (!updatedProduct) {
    throw new Response("Product not found", { status: 404 });
  }

  return redirect("/products");
}

export default function EditProduct() {
  const { product } = useLoaderData();
  const actionData = useActionData();

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-500">Update product details</p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          Cancel
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Form method="post" className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                defaultValue={product.name}
                placeholder="Enter product name"
              />
              {actionData?.errors?.name && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.name}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <Input
                type="text"
                name="sku"
                id="sku"
                defaultValue={product.sku}
                placeholder="Enter SKU"
              />
              {actionData?.errors?.sku && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.sku}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <Input
                type="number"
                name="price"
                id="price"
                step="0.01"
                defaultValue={product.price}
                placeholder="0.00"
              />
              {actionData?.errors?.price && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.price}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <Input
                type="number"
                name="stock"
                id="stock"
                defaultValue={product.stock}
                placeholder="0"
              />
              {actionData?.errors?.stock && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.stock}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select
                id="category"
                name="category"
                defaultValue={product.category}
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Garden">Home & Garden</option>
              </Select>
              {actionData?.errors?.category && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.category}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select
                id="status"
                name="status"
                defaultValue={product.status}
              >
                <option value="">Select a status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
              {actionData?.errors?.status && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.status}</p>
              )}
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={product.description}
                placeholder="Enter product description"
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <Input
                type="text"
                name="image"
                id="image"
                defaultValue={product.image}
                placeholder="Enter image URL"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Update Product
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
} 