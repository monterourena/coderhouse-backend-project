import { emitUpdatedProducts } from "../../handlers/products.handler.js";
import { ProductsService } from "../services/products.service.js";
import { productsValidator } from "../validations/products.validation.js";

const productsService = new ProductsService();

export class ProductsController {
  getProducts = async (req, res) => {
    const queries = req.query;
  
    // Validation Stage
    const { isValid, mappedQueries } = productsValidator.validateQueries(queries);
    if (!isValid) return res.sendResponse.badRequest();
  
    // Query to service
    const products = await productsService.getPaginatedProducts(mappedQueries);
    const {docs, ...paginationParams} = products;
  
    res.sendResponse.ok({ data:docs, ...paginationParams});
  };
  addProduct = async (req, res) => {
    const product = req.body;
    const result = await productsService.addProduct(product);
  
    emitUpdatedProducts(req.io);
    res.sendResponse.created({ data: result });
  };
  getProductById = async (req, res) => {
    const pid = req.params.pid;
    const product = await productsService.getProductById(pid);
    res.sendResponse.ok({ data: product });
  };
  updateProductById = async (req, res) => {
    const pid = req.params.pid;
    const params = req.body;
    const updatedProduct = await productsService.updateProductById(pid, params);
  
    emitUpdatedProducts(req.io);
    res.sendResponse.ok({ data: updatedProduct });
  };
  deleteProductById = async (req, res) => {
    const pid = req.params.pid;
    const deletedProduct = await productsService.deleteProductById(pid);
  
    emitUpdatedProducts(req.io);
    res.sendResponse.ok({ data: deletedProduct });
  };
}
