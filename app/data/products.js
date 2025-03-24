export const productCategories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports & Outdoors",
  "Toys & Games",
  "Health & Beauty",
  "Automotive",
  "Pet Supplies"
];

let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    sku: "WH-001",
    price: 99.99,
    stock: 50,
    category: "Electronics",
    status: "Active",
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
  },
  {
    id: 2,
    name: "Running Shoes",
    sku: "RS-002",
    price: 129.99,
    stock: 30,
    category: "Sports & Outdoors",
    status: "Active",
    description: "Comfortable running shoes for professional athletes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
  },
  {
    id: 3,
    name: "Smart Watch",
    sku: "SW-003",
    price: 199.99,
    stock: 25,
    category: "Electronics",
    status: "Active",
    description: "Feature-rich smartwatch with health tracking",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop"
  },
  {
    id: 4,
    name: "Coffee Maker",
    sku: "CM-004",
    price: 79.99,
    stock: 15,
    category: "Home & Garden",
    status: "Active",
    description: "Automatic coffee maker with timer",
    image: "https://images.unsplash.com/photo-1517663156590-b82429dadd9a?w=500&h=500&fit=crop"
  },
  {
    id: 5,
    name: "Yoga Mat",
    sku: "YM-005",
    price: 29.99,
    stock: 100,
    category: "Sports & Outdoors",
    status: "Active",
    description: "Premium non-slip yoga mat",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&h=500&fit=crop"
  },
  {
    id: 6,
    name: "Laptop Backpack",
    sku: "LB-006",
    price: 49.99,
    stock: 45,
    category: "Electronics",
    status: "Active",
    description: "Water-resistant laptop backpack with multiple compartments",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
  },
  {
    id: 7,
    name: "Organic Tea Set",
    sku: "TS-007",
    price: 39.99,
    stock: 20,
    category: "Home & Garden",
    status: "Active",
    description: "Eco-friendly tea set with organic tea samples",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500&h=500&fit=crop"
  },
  {
    id: 8,
    name: "Fitness Tracker",
    sku: "FT-008",
    price: 89.99,
    stock: 60,
    category: "Sports & Outdoors",
    status: "Active",
    description: "Waterproof fitness tracker with heart rate monitoring",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop"
  },
  {
    id: 9,
    name: "Wireless Mouse",
    sku: "WM-009",
    price: 34.99,
    stock: 75,
    category: "Electronics",
    status: "Active",
    description: "Ergonomic wireless mouse with long battery life",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"
  },
  {
    id: 10,
    name: "Desk Chair",
    sku: "DC-010",
    price: 149.99,
    stock: 10,
    category: "Home & Garden",
    status: "Active",
    description: "Ergonomic office chair with lumbar support",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop"
  }
];

export function getProducts(page = 1, perPage = 5) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    totalPages: Math.ceil(products.length / perPage),
    currentPage: page,
    totalItems: products.length
  };
}

export function getProduct(id) {
  return products.find(product => product.id === parseInt(id));
}

export function updateProduct(productData) {
  const index = products.findIndex(p => p.id === productData.id);
  if (index === -1) {
    return null;
  }
  products[index] = { ...products[index], ...productData };
  return products[index];
}

export function deleteProduct(id) {
  products = products.filter(product => product.id !== parseInt(id));
}

export function addProduct(product) {
  const newProduct = {
    ...product,
    id: Math.max(...products.map(p => p.id), 0) + 1,
    price: parseFloat(product.price),
    stock: parseInt(product.stock)
  };
  products.push(newProduct);
  return newProduct;
} 