const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    discount: { type: String, required: true },
    discounttext1: { type: String, required: true },
    discounttext2: { type: String, required: true },
    type: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = new mongoose.model("product", productSchema);
