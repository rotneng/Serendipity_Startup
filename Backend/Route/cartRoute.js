const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeItem,
  updateCartQuantity,
} = require("../Controller/CartController");
const { protect } = require("../Middleware/authMiddleware");

router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartQuantity);
router.delete("/:productId", removeItem);

module.exports = router;
