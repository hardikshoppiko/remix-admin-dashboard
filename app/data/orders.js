// Mock data
let orders = [
  {
    id: "1",
    order_number: "ORD-001",
    customer: {
      id: "1",
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      telephone: "1234567890"
    },
    total: 299.99,
    status: "Pending",
    date_added: "2024-03-15",
    payment_method: "Credit Card",
    shipping_address: {
      firstname: "John",
      lastname: "Doe",
      address_1: "123 Main St",
      city: "New York",
      postcode: "10001",
      country: "United States"
    }
  },
  {
    id: "2",
    order_number: "ORD-002",
    customer: {
      id: "2",
      firstname: "Jane",
      lastname: "Smith",
      email: "jane@example.com",
      telephone: "9876543210"
    },
    total: 149.99,
    status: "Processing",
    date_added: "2024-03-14",
    payment_method: "PayPal",
    shipping_address: {
      firstname: "Jane",
      lastname: "Smith",
      address_1: "456 Oak Ave",
      city: "Los Angeles",
      postcode: "90001",
      country: "United States"
    }
  },
  {
    id: "3",
    order_number: "ORD-003",
    customer: {
      id: "3",
      firstname: "Mike",
      lastname: "Johnson",
      email: "mike@example.com",
      telephone: "5555555555"
    },
    total: 499.99,
    status: "Completed",
    date_added: "2024-03-13",
    payment_method: "Credit Card",
    shipping_address: {
      firstname: "Mike",
      lastname: "Johnson",
      address_1: "789 Pine Rd",
      city: "Chicago",
      postcode: "60601",
      country: "United States"
    }
  }
];

export function getOrders() {
  return orders;
}

export function getOrder(id) {
  return orders.find(order => order.id === id);
}

export function updateOrderStatus(id, status) {
  const order = orders.find(order => order.id === id);
  if (!order) {
    throw new Error("Order not found");
  }
  order.status = status;
  return order;
}

export function deleteOrder(id) {
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) {
    throw new Error("Order not found");
  }
  orders.splice(index, 1);
  return true;
} 