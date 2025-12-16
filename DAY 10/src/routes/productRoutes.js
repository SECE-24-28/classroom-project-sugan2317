const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// GET all products
// POST create a new product
router.route('/')
  .get(getAllProducts)
  .post(createProduct);

// GET one product by ID
// PATCH update a product
// DELETE a product
router.route('/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
