const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../Controller/ProductController");
const { protect, authorize } = require("../Middleware/authMiddleware");

router.get("/", getProducts);

router.post("/add", protect, authorize("farmer"), createProduct);

router
  .route("/:id")
  .put(protect, authorize("farmer", "admin"), updateProduct)
  .delete(protect, authorize("farmer", "admin"), deleteProduct);

module.exports = router;
