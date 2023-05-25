import { ProductsService } from "../services/products.service.js";

const controller = [];
const productsService = new ProductsService();

const emitUpdatedProducts = async (io)=>{
  const allProducts = await productsService.getProducts()
  io.emit("products:update", allProducts)
}

controller.getProducts = async (req, res) => {
  const products = await productsService.getProducts();
  res.sendResponse.ok({data:products});
};
controller.addProduct = async (req, res) => {
  const product = req.body;
  const result = await productsService.addProduct(product);

  emitUpdatedProducts(req.io)

  res.sendResponse.created({ data: result })
};
controller.getProductById = async (req, res) => {
  const pid = req.params.pid;
  const product = await productsService.getProductById(pid);
  res.sendResponse.ok({ data: product })
};
controller.updateProductById = async (req, res) => {
  const pid = req.params.pid;
  const params = req.body;
  const updatedProduct = await productsService.updateProductById(pid, params);
  
  emitUpdatedProducts(req.io)

  res.sendResponse.ok({ data: updatedProduct })
};
controller.deleteProductById = async (req, res) => {
  const pid = req.params.pid;
  const deletedProduct = await productsService.deleteProductById(pid);

  emitUpdatedProducts(req.io)

  res.sendResponse.ok({ data: deletedProduct })
};

export { controller as productsController };
