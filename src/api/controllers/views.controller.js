import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";
import { productsValidator } from "../validations/products.validation.js";

const controller = [];
const productsService = new ProductsService();
const cartsService = new CartsService()

controller.displayProducts = async (req, res) => {
  const queries = req.query;
  // Validation Stage
  const { isValid, mappedQueries } = productsValidator.validateQueries(queries);
  if (!isValid) return res.sendResponse.badRequest();

  // Query to service
  mappedQueries.limit = 2;
  const products = await productsService.getPaginatedProducts(mappedQueries);
  const { docs, ...paginationParams } = products;

  res.render("products", { user: req.session.user, products: docs, paginationParams });
};
controller.realTimeProducts = async (req, res) => {
  const products = await productsService.getProducts();
  res.render("realtimeproducts", { products });
};

controller.displayCart = async (req, res) =>{
  const DEFAULT_CART_ID = "6470f7907ba3639eb9354505"
  const {cid=DEFAULT_CART_ID} = req.query;

  const productsInCart = await cartsService.getCartProducts(cid);

  res.render("cart", {products:productsInCart.products})
}

controller.displayChat = async (req, res) => {
  res.render("chat");
};

controller.displayLogin = async(req,res) =>{
  res.render("login")
}
controller.displayRegister = async(req,res) =>{
  res.render("register")
}


export { controller as viewsController };
