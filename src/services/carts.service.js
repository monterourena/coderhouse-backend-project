import mongoose from "mongoose";
import { cartModel } from "../models/cart.model.js";

class CartsService {
  createCart = () => cartModel.create({ products: [] });

  getCartProducts = (cid) =>
    cartModel.findById(cid).populate("products.product");

  addProductToCart = (params) => {
    const { cid, pid, quantity } = params;
    return cartModel.updateOne(
      { _id: cid },
      {
        $push: {
          products: {
            product: new mongoose.Types.ObjectId(pid),
            quantity: quantity,
          },
        },
      }
    );
  };
}

export { CartsService };
