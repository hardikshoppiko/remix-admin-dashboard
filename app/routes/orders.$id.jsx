import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAuth } from "../utils/requireAuth";
import { getOrder } from "../data/orders";
import { Container } from "../components/ui/container";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "../utils/cn";

export const meta = () => {
  return [
    { title: "Order Details - OpenCart Admin" },
    { name: "description", content: "View order details" }
  ];
};

export async function loader({ request, params }) {
  await requireAuth(request);
  const order = getOrder(params.id);
  if (!order) {
    throw new Response("Order not found", { status: 404 });
  }
  return json({ order });
}

export default function OrderDetails() {
  const { order } = useLoaderData();

  return (
    <Container>
      <div className="flex items-center mb-6">
        <Link
          to="/orders"
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-500">Order #{order.order_number}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Order Status</h2>
              <p className="text-sm text-gray-500">Current status of the order</p>
            </div>
            <span className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              order.status === "Completed" ? "bg-green-100 text-green-800" :
              order.status === "Processing" ? "bg-blue-100 text-blue-800" :
              "bg-yellow-100 text-yellow-800"
            )}>
              {order.status}
            </span>
          </div>

          {/* Customer Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {order.customer.firstname} {order.customer.lastname}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{order.customer.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Telephone</h3>
                <p className="mt-1 text-sm text-gray-900">{order.customer.telephone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(order.date_added).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-900">
                {order.shipping_address.firstname} {order.shipping_address.lastname}
              </p>
              <p className="text-sm text-gray-900">{order.shipping_address.address_1}</p>
              <p className="text-sm text-gray-900">
                {order.shipping_address.city}, {order.shipping_address.postcode}
              </p>
              <p className="text-sm text-gray-900">{order.shipping_address.country}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm text-gray-900">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm text-gray-900">$0.00</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Tax</span>
                <span className="text-sm text-gray-900">$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Total</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm text-gray-900">{order.payment_method}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
} 