const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductDetails, 
  updateProduct,
  deleteProduct
} = require("../Controller/ProductController");
const { protect } = require("../Middleware/authMiddleware");

router.route("/").get(getProducts);
router.route("/add").post(protect, createProduct);

router.route("/:id").get(getProductDetails);

router.route("/:id")
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;