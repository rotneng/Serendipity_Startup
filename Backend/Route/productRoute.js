const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../Util/cloudinary");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../Controller/ProductController");
const { protect, authorize } = require("../Middleware/authMiddleware");

const upload = multer({ storage });
router.get("/", getProducts);
router.post(
  "/add",
  protect,
  authorize("farmer"),
  upload.array("images", 5),
  createProduct,
);

router
  .route("/:id")
  .put(
    protect,
    authorize("farmer", "admin"),
    upload.array("images", 5),
    updateProduct,
  )
  .delete(protect, authorize("farmer", "admin"), deleteProduct);

module.exports = router;
