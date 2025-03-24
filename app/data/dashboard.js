export function getDashboardStats() {
  // Mock data for dashboard statistics
  return {
    totalSales: 12500.75,
    totalOrders: 156,
    totalCustomers: 89,
    totalProducts: 234,
    recentOrders: [
      {
        id: "1001",
        customer: "John Doe",
        amount: 125.50,
        status: "Completed",
        date: "2024-03-15"
      },
      {
        id: "1002",
        customer: "Jane Smith",
        amount: 75.25,
        status: "Pending",
        date: "2024-03-15"
      },
      {
        id: "1003",
        customer: "Mike Johnson",
        amount: 250.00,
        status: "Processing",
        date: "2024-03-14"
      },
      {
        id: "1004",
        customer: "Sarah Williams",
        amount: 89.99,
        status: "Completed",
        date: "2024-03-14"
      },
      {
        id: "1005",
        customer: "Robert Brown",
        amount: 199.99,
        status: "Completed",
        date: "2024-03-13"
      }
    ]
  };
} 