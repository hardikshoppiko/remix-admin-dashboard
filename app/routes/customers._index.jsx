import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAuth } from "../utils/requireAuth";
import { getCustomers } from "../data/customers";
import { Container } from "../components/ui/container";
import { cn } from "../lib/utils";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

export const meta = () => {
  return [
    { title: "Customers - OpenCart Admin" },
    { name: "description", content: "Manage your customers" }
  ];
};
  
export async function loader({ request }) {
  await requireAuth(request);
  const customers = getCustomers();
  return json({ customers });
}
  
export default function Customers() {
  const { customers } = useLoaderData();
  
  return (
    <Container>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500">Manage your customers</p>
        </div>
        <Link to="/customers/new">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
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
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telephone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.firstname} {customer.lastname}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{customer.telephone}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    customer.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  )}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/customers/${customer.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <form action={`/customers/${customer.id}/delete`} method="post">
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