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
  const quantity = parseInt(req.query.quantity);

  if (!quantity) {
    return Response.badRequest(res);
  }

  const response = await cartsService.addProductToCart({ cid, pid, quantity });
  Response.ok(res, { data: response });
};

export { controller as cartsController };
