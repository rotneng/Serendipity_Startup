const Product = require("../Model/ProductModel");
const { cloudinary } = require("../Util/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    if (!req.body.image) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a product image" });
    }

    const images = [
      {
        url: req.body.image,
        public_id: req.body.public_id || "none",
      },
    ];

    const product = await Product.create({
      ...req.body,
      farmer: req.user.id,
      images: images,
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error("Create Product Error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "farmer",
      "name location phoneNumber",
    );
    res
      .status(200)
      .json({ success: true, count: products.length, products: products }); // Ensure key matches action (products)
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (
      product.farmer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    if (req.body.image) {
      const newImage = {
        url: req.body.image,
        public_id: req.body.public_id || "none",
      };
      req.body.images = [newImage];
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (
      product.farmer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    const deletePromises = product.images.map((img) =>
      cloudinary.uploader.destroy(img.public_id),
    );
    await Promise.all(deletePromises);

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product and associated images deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
