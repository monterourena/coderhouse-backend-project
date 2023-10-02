import { productsValidator } from "../validations/products.validation.js";
import { Services } from "../services/services.js";

const productsService = Services.products

export class ProductsController {
  getProducts = async (req, res) => {
    const queries = req.query;
  
    // Validation Stage
    const { isValid, mappedQueries } = productsValidator.validateQueries(queries);
    if (!isValid) return res.sendResponse.badRequest();
  
    // Query to service
    const products = await productsService.getPaginatedProducts(mappedQueries);
    const {docs, ...paginationParams} = products;
  
    res.sendSuccess({ data:docs, ...paginationParams});
  };
  addProduct = async (req, res) => {
    const product = req.body;
    const result = await productsService.addProduct(product);
    res.sendCreated({ data: result });
  };
  getProductById = async (req, res) => {
    const pid = req.params.pid;
    const product = await productsService.getProductById(pid);
    res.sendSuccess({ data: product });
  };
  updateProductById = async (req, res) => {
    const pid = req.params.pid;
    const params = req.body;
    const updatedProduct = await productsService.updateProductById(pid, params);
    res.sendSuccess({ data: updatedProduct });
  };
  deleteProductById = async (req, res) => {
    const pid = req.params.pid;
    const deletedProduct = await productsService.deleteProductById(pid);
    res.sendSuccess({ data: deletedProduct });
  };
}
