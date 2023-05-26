import { emitUpdatedProducts } from "../handlers/products.handler.js";
import { ProductsService } from "../services/products.service.js";
import { validator } from "./validators/products.validator.js";

const controller = [];
const productsService = new ProductsService();

controller.getProducts = async (req, res) => {
  const queries = req.query;

  // Validation Stage
  const { isValid, mappedQueries } = validator.getProducts(queries);
  if (!isValid) return res.sendResponse.badRequest();

  // Query to service
  const products = await productsService.getPaginatedProducts(mappedQueries);
  const {docs, ...paginationParams} = products;

  res.sendResponse.ok({ data:docs, ...paginationParams});
};
controller.addProduct = async (req, res) => {
  const product = req.body;
  const result = await productsService.addProduct(product);

  emitUpdatedProducts(req.io);
  res.sendResponse.created({ data: result });
};
controller.getProductById = async (req, res) => {
  const pid = req.params.pid;
  const product = await productsService.getProductById(pid);
  res.sendResponse.ok({ data: product });
};
controller.updateProductById = async (req, res) => {
  const pid = req.params.pid;
  const params = req.body;
  const updatedProduct = await productsService.updateProductById(pid, params);

  emitUpdatedProducts(req.io);
  res.sendResponse.ok({ data: updatedProduct });
};
controller.deleteProductById = async (req, res) => {
  const pid = req.params.pid;
  const deletedProduct = await productsService.deleteProductById(pid);

  emitUpdatedProducts(req.io);
  res.sendResponse.ok({ data: deletedProduct });
};

export { controller as productsController };
