const Cart = require("../Model/CartModel");
const Product = require("../Model/ProductModel");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id || req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    const itemData = {
      product: productId,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || "",
      stock: product.stockQuantity,
      quantity: quantity,
    };

    if (cart) {
      const itemIndex = cart.cartItems.findIndex(
        (p) => p.product && p.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        cart.cartItems.push(itemData);
      }

      cart.markModified("cartItems");
      await cart.save();
    } else {
      cart = await Cart.create({
        user: userId,
        cartItems: [itemData],
      });
    }

    const populatedCart = await Cart.findById(cart._id).populate({
      path: "cartItems.product",
      select: "name price images stockQuantity",
    });

    res.status(200).json({ success: true, data: populatedCart });
  } catch (err) {
    console.error("Cart Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "cartItems.product",
    );

    if (!cart) {
      return res.status(200).json({ success: true, data: { cartItems: [] } });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.removeItem = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id || req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== req.params.productId,
    );
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id || req.user.id;

    if (quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stockQuantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stockQuantity} items left in stock`,
      });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.cartItems.findIndex(
      (p) => p.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity = quantity;
      await cart.save();
      await cart.populate({
        path: "cartItems.product",
        select: "name price images stockQuantity",
      });

      res.status(200).json({ success: true, data: cart });
    } else {
      res.status(404).json({ success: false, message: "Item not in cart" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
