import { Services } from "../api/services/services.js";


const productsService = Services.products

const emitUpdatedProducts = async (io) => {
  const allProducts = await productsService.getProducts();
  io.emit("products:update", allProducts);
};

export { emitUpdatedProducts };
