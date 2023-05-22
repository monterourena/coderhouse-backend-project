import mongoose from "mongoose";

const collection = "products";
const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: [],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const productModel = mongoose.model(collection,schema)

export {productModel}