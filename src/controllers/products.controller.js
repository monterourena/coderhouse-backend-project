import { ProductsService } from "../services/products.service.js";
import { Response } from "../utils/response.utils.js";

const controller = [];
const productsService = new ProductsService();

const emitUpdatedProducts = async (io)=>{
  const allProducts = await productsService.getProducts()
  io.emit("productsUpdate", allProducts)
}

controller.getProducts = async (req, res) => {
  const products = await productsService.getProducts();
  Response.ok(res, { data: products });
};
controller.addProduct = async (req, res) => {
  const product = req.body;
  const result = await productsService.addProduct(product);

  emitUpdatedProducts(req.io)

  Response.created(res, { data: result });
};
controller.getProductById = async (req, res) => {
  const pid = req.params.pid;
  const product = await productsService.getProductById(pid);
  Response.ok(res, { data: product });
};
controller.updateProductById = async (req, res) => {
  const pid = req.params.pid;
  const params = req.body;
  const updatedProduct = await productsService.updateProductById(pid, params);
  
  emitUpdatedProducts(req.io)

  Response.ok(res, { data: updatedProduct });
};
controller.deleteProductById = async (req, res) => {
  const pid = req.params.pid;
  const deletedProduct = await productsService.deleteProductById(pid);

  emitUpdatedProducts(req.io)

  Response.ok(res, { data: deletedProduct });
};

export { controller as productsController };
