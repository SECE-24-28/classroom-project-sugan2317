// Sample product data
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Tablet", price: 30000 },
  { id: 4, name: "Headphones", price: 5000 },
  { id: 5, name: "Keyboard", price: 2000 }
];

// Get all products
const getAllProducts = () => {
  return products;
};

// Get product by ID
const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Add a new product
const addProduct = (product) => {
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    ...product
  };
  products.push(newProduct);
  return newProduct;
};

// Update a product
const updateProduct = (id, updatedProduct) => {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    return products[index];
  }
  return null;
};

// Delete a product
const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    return products.splice(index, 1)[0];
  }
  return null;
};

module.exports = {
  products,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
