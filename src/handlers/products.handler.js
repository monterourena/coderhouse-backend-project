import { ProductsService } from "../services/products.service.js";

const productsService = new ProductsService();

const emitUpdatedProducts = async (io) => {
  const allProducts = await productsService.getProducts();
  io.emit("products:update", allProducts);
};

export { emitUpdatedProducts };
