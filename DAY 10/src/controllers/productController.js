const { 
  getAllProducts, 
  getProductById, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} = require('../models/productModel');

// Get all products
const getAllProductsHandler = (req, res) => {
  try {
    const products = getAllProducts();
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching products'
    });
  }
};

// Get single product by ID
const getProductHandler = (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching product'
    });
  }
};

// Create a new product
const createProductHandler = (req, res) => {
  try {
    const newProduct = addProduct(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid product data'
    });
  }
};

// Update a product
const updateProductHandler = (req, res) => {
  try {
    const product = updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error updating product'
    });
  }
};

// Delete a product
const deleteProductHandler = (req, res) => {
  try {
    const product = deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error deleting product'
    });
  }
};

module.exports = {
  getAllProducts: getAllProductsHandler,
  getProduct: getProductHandler,
  createProduct: createProductHandler,
  updateProduct: updateProductHandler,
  deleteProduct: deleteProductHandler
};
