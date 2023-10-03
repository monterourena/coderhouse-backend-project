import Router from "./router.js"

export default class CartsRouter extends Router{
    routes(){
        this.post("/", this.cartsController.createCart)
        this.get("/:cid", this.cartsController.getCartProducts)
        this.post("/:cid/products/:pid", this.cartsController.addProductToCart)
        this.post("/:cid/purchase", this.cartsController.purchaseCart)
        
        this.put("/:cid/products/:pid",this.cartsController.updateProductQuantity)
        this.put("/:cid",this.cartsController.updateCartContent)
        this.delete("/:cid",this.cartsController.deleteCartContent)
        this.delete("/:cid/products/:pid",this.cartsController.deleteOneProduct)
    }
}