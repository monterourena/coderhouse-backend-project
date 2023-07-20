import mongoose from "mongoose";
import aggregatePaginate  from "mongoose-aggregate-paginate-v2"

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

schema.plugin(aggregatePaginate)

const productModel = mongoose.model(collection,schema)

export {productModel, schema as productSchema}