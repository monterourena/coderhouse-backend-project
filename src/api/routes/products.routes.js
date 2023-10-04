import { Middlewares } from "../middlewares/middlewares.js";
import Router from "./router.js"
export default class ProductsRouter extends Router{
    routes(){
        this.get("/", this.productsController.getProducts);
        this.post("/", this.productsController.addProduct)
        this.get("/:pid", this.productsController.getProductById)

        this.put("/:pid/:uid", Middlewares.updateDeleteProductPolicy, this.productsController.updateProductById)
        this.delete("/:pid/:uid",Middlewares.updateDeleteProductPolicy,this.productsController.deleteProductById)
    }
}

