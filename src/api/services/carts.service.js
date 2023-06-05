import mongoose from "mongoose";
import { cartModel } from "../models/cart.model.js";

class CartsService {
  createCart = () => cartModel.create({ products: [] });

  getCartProducts = (cid) =>
    cartModel.findById(cid).populate("products.product").lean();

  addProductToCart = async (cid, pid, quantity) => {
    const cart = await cartModel.findOne({ _id: cid });
    pid = new mongoose.Types.ObjectId(pid);

    const existingProduct = cart.products.find((product) =>
      product.product.equals(pid)
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    return cart.save();
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
