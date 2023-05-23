import mongoose, { Schema } from "mongoose";

const collection = "carts";
const schema = new mongoose.Schema(
  {
    products: {
      type:[{
        quantity: Number,
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "products"
        }
      }],
      default:[]
    }, 
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const cartModel = mongoose.model(collection, schema);
export { cartModel };
