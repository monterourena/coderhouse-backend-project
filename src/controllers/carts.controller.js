import { Response } from "../utils/response.utils.js";
import { CartsService } from "../services/carts.service.js";

const controller = [];
const cartsService = new CartsService();

controller.createCart = async (req, res) => {
  const response = await cartsService.createCart();
  Response.created(res, { data: response });
};
controller.getCartProducts = async (req, res) => {
  const { cid } = req.params;
  const products = await cartsService.getCartProducts(cid);
  Response.ok(res, { data: products });
};
controller.addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = parseInt(req.body.quantity);

  if (!quantity) {
    return Response.badRequest(res);
  }

  const response = await cartsService.addProductToCart(cid, pid, quantity);
  Response.ok(res, { data: response });
};

controller.updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = parseInt(req.body.quantity);
  const result = await cartsService.updateProductQuantity(cid, pid, quantity);
  res.sendResponse.ok({ data: result });
};

controller.updateCartContent = async (req, res) => {
  const { cid } = req.params;
  const { cartContent } = req.body;

  await cartsService.clearCartContent(cid);

  for (const product of cartContent) {
    await cartsService.addProductToCart(cid, product.pid, product.quantity);
  }

  res.sendResponse.ok();
};
controller.deleteCartContent = async (req, res) => {
  const { cid } = req.params;
  const response = await cartsService.clearCartContent(cid);
  res.sendResponse.ok({data:response})
};
controller.deleteOneProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cartsService.deleteOneProduct(cid, pid)
  res.sendResponse.ok({data:result})
};

export { controller as cartsController };
