import Router from "./router.js"
import { cartsController } from "../controllers/carts.controller.js"

export default class CartsRouter extends Router{
    routes(){
        this.post("/", cartsController.createCart)
        this.get("/:cid", cartsController.getCartProducts)
        this.post("/:cid/products/:pid", cartsController.addProductToCart)
        
        this.put("/:cid/products/:pid",cartsController.updateProductQuantity)
        this.put("/:cid",cartsController.updateCartContent)
        this.delete("/:cid",cartsController.deleteCartContent)
        this.delete("/:cid/products/:pid",cartsController.deleteOneProduct)
    }
}