import { ProductsService } from "../services/products.service.js";
import { productsValidator } from "./validators/products.validator.js";

const controller = [];
const productsService = new ProductsService();

controller.displayProducts = async (req, res) => {
  const queries = req.query;

  // Validation Stage
  const { isValid, mappedQueries } = productsValidator.validateQueries(queries);
  if (!isValid) return res.sendResponse.badRequest();

  // Query to service
  mappedQueries.limit = 2;
  const products = await productsService.getPaginatedProducts(mappedQueries);
  const { docs, ...paginationParams } = products;

  res.render("products", { products: docs, paginationParams });
};
controller.realTimeProducts = async (req, res) => {
  const products = await productsService.getProducts();
  res.render("realtimeproducts", { products });
};

controller.displayChat = async (req, res) => {
  res.render("chat");
};

export { controller as viewsController };
