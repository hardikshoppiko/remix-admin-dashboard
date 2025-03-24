// Mock data
let customers = [
  {
    id: "1",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    telephone: "5551234567",
    status: "Active"
  },
  {
    id: "2",
    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    telephone: "5552345678",
    status: "Active"
  },
  {
    id: "3",
    firstname: "Mike",
    lastname: "Johnson",
    email: "mike.johnson@example.com",
    telephone: "5553456789",
    status: "Inactive"
  }
];

export function getCustomers() {
  return customers;
}

export function getCustomer(id) {
  return customers.find(customer => customer.id === id);
}

export function addCustomer(customerData) {
  const newCustomer = {
    id: String(customers.length + 1),
    ...customerData,
    status: customerData.status || "Active"
  };
  customers.push(newCustomer);
  return newCustomer;
}

export function updateCustomer(id, customerData) {
  const index = customers.findIndex(customer => customer.id === id);
  if (index === -1) {
    throw new Error("Customer not found");
  }

  customers[index] = {
    ...customers[index],
    ...customerData
  };

  return customers[index];
}

export function deleteCustomer(id) {
  const index = customers.findIndex(customer => customer.id === id);
  if (index === -1) {
    throw new Error("Customer not found");
  }

  customers = customers.filter(customer => customer.id !== id);
} 