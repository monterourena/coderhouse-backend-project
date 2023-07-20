import Router from "./router.js"
import { productsController } from "../controllers/products.controller.js"

export default class ProductsRouter extends Router{
    routes(){
        this.get("/", productsController.getProducts);
        this.post("/", productsController.addProduct)
        this.get("/:pid", productsController.getProductById);
        this.put("/:pid",productsController.updateProductById)
        this.delete("/:pid",productsController.deleteProductById)
    }
}

