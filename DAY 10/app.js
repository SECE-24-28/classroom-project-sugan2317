const express = require("express");
const app = express();
const port = 3000;
const productRoutes = require("./src/routes/productRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Products API. Use /products to access products.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
