import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  stock: {
    type: Number,
    default: null,
  },
  priceList: {
    type: Number,
    required: true,
  },
  priceCost: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  image: {
    type: Array,
    default: [],
  },
  sales: {
    type: Array,
    default: [
    ],
  },
});

export const Product = mongoose.model("Product", productSchema);
