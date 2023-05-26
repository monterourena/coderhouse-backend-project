import mongoose from "mongoose";
import { cartModel } from "../models/cart.model.js";

class CartsService {
  createCart = () => cartModel.create({ products: [] });

  getCartProducts = (cid) =>
    cartModel.findById(cid).populate("products.product");

  addProductToCart = (cid, pid, quantity) => {
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

  // Modify only the quantity of the first product found by pid
  updateOneProductQuantity = (cid, pid, qty) => {
    return cartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": qty } },
      { new: true }
    );
  };

  // Modifies the quantity of a several products if they have the same pid
  updateProductQuantity = (cid, pid, qty) => {
    return cartModel.updateOne(
      { _id: cid },
      { $set: { "products.$[index].quantity": qty } },
      { arrayFilters: [{ "index.product": pid }] }
    );
  };

  clearCartContent = (cid) => {
    return cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
  };

  deleteOneProduct = (cid, pid) => {
    return cartModel.findOneAndUpdate(
      { _id: cid },
      { $pull: { products: { product: pid } } },
      { new: true }
    );
  };
}

export { CartsService };
