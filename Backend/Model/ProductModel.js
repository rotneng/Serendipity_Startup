const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    unit: {
      type: String,
      enum: ["kg", "bag", "paint-bucket", "crate"],
      default: "kg",
    },
    category: {
      type: String,
      required: [true, "Please category (e.g. Vegetables, Grains, Fruits)"],
    },
    stockQuantity: {
      type: Number,
      required: [true, "Please add stock quantity"],
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
