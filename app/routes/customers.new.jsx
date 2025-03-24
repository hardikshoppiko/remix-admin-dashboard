import { Form, redirect } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAuth } from "../utils/requireAuth";
import { addCustomer } from "../data/customers";
import { Container } from "../components/ui/container";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useActionData } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Add Customer - OpenCart Admin" },
    { name: "description", content: "Create a new customer" }
  ];
};

export async function action({ request }) {
  await requireAuth(request);
  const formData = await request.formData();
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const telephone = formData.get("telephone");
  const status = formData.get("status");

  // Validate required fields
  const errors = {};
  if (!firstname) errors.firstname = "First name is required";
  if (!lastname) errors.lastname = "Last name is required";
  
  // Email validation
  if (!email) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }
  
  // Telephone validation
  if (!telephone) {
    errors.telephone = "Telephone is required";
  } else {
    const numericTelephone = telephone.replace(/\D/g, "");
    if (numericTelephone.length !== 10) {
      errors.telephone = "Telephone must be exactly 10 digits";
    } else if (!/^\d+$/.test(numericTelephone)) {
      errors.telephone = "Telephone must contain only numbers";
    }
  }
  
  if (!status) errors.status = "Status is required";

  if (Object.keys(errors).length > 0) {
    return json({ 
      errors,
      formData: {
        firstname,
        lastname,
        email,
        telephone,
        status
      }
    }, { status: 400 });
  }

  // Format telephone to remove any non-numeric characters
  const formattedTelephone = telephone.replace(/\D/g, "");

  addCustomer({
    firstname,
    lastname,
    email,
    telephone: formattedTelephone,
    status
  });

  return redirect("/customers");
}

export default function NewCustomer() {
  const actionData = useActionData();
  const formData = actionData?.formData || {};

  return (
    <Container>
      <div className="flex items-center mb-6">
        <a
          href="/customers"
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Customer</h1>
          <p className="text-gray-500">Create a new customer</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Form method="post" className="p-6 space-y-6">
          {actionData?.errors && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              Please fix the errors below
            </div>
          )}

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                defaultValue={formData.firstname}
                placeholder="Enter first name"
                required
              />
              {actionData?.errors?.firstname && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.firstname}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                defaultValue={formData.lastname}
                placeholder="Enter last name"
                required
              />
              {actionData?.errors?.lastname && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.lastname}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                defaultValue={formData.email}
                placeholder="Enter email address"
                required
              />
              {actionData?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                Telephone
              </label>
              <Input
                type="number"
                name="telephone"
                id="telephone"
                defaultValue={formData.telephone}
                placeholder="Enter phone number"
                required
                min="1000000000"
                max="9999999999"
              />
              {actionData?.errors?.telephone && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.telephone}</p>
              )}
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select
                id="status"
                name="status"
                defaultValue={formData.status || "Active"}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
              {actionData?.errors?.status && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.status}</p>
              )}
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
              Create Customer
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
} 