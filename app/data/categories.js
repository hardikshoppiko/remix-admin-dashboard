const categories = [
  {
    id: 1,
    name: "Electronics",
    parent: null,
    products: 25,
    status: "Active"
  },
  {
    id: 2,
    name: "Smartphones",
    parent: "Electronics",
    products: 12,
    status: "Active"
  },
  {
    id: 3,
    name: "Laptops",
    parent: "Electronics",
    products: 8,
    status: "Active"
  },
  {
    id: 4,
    name: "Clothing",
    parent: null,
    products: 45,
    status: "Active"
  },
  {
    id: 5,
    name: "Men's Clothing",
    parent: "Clothing",
    products: 20,
    status: "Active"
  },
  {
    id: 6,
    name: "Women's Clothing",
    parent: "Clothing",
    products: 25,
    status: "Active"
  },
  {
    id: 7,
    name: "Books",
    parent: null,
    products: 30,
    status: "Inactive"
  }
];

export function getCategories() {
  return categories;
}

export function getCategory(id) {
  return categories.find(category => category.id === parseInt(id));
}

export function addCategory(categoryData) {
  const newCategory = {
    id: categories.length + 1,
    ...categoryData
  };
  categories.push(newCategory);
  return newCategory;
}

export function updateCategory(id, categoryData) {
  const index = categories.findIndex(category => category.id === parseInt(id));
  if (index === -1) {
    throw new Error("Category not found");
  }

  categories[index] = {
    ...categories[index],
    ...categoryData
  };

  return categories[index];
}

export function deleteCategory(id) {
  const index = categories.findIndex(c => c.id === parseInt(id));
  if (index === -1) {
    throw new Error("Category not found");
  }
  categories.splice(index, 1);
} 