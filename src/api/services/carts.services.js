export class CartsServices{
    constructor(manager){
        this.manager = manager
    }
    createCart = () => { 
        return this.manager.createCart()
    }
    getCartProducts = (cid) => {
        return this.manager.getCartProducts(cid)
    }
    addProductToCart = (cid, pid, quantity) => {
        return this.manager.addProductToCart(cid, pid, quantity)
    }
    updateOneProductQuantity = (cid, pid, qty) => {
        return this.manager.updateOneProductQuantity(cid, pid, qty)
    }
    updateProductQuantity = (cid, pid, qty) => {
        return this.manager.updateProductQuantity(cid, pid, qty)
    }
    clearCartContent = (cid) => {
        return this.manager.clearCartContent(cid)
    }
    deleteOneProduct = (cid, pid) => {
        return this.manager.deleteOneProduct(cid, pid)
    }


}