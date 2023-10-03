export class ProductsServices{
    constructor(manager){
        this.manager = manager
    }
    getPaginatedProducts = (params) => {
        return this.manager.getPaginatedProducts(params)
    }
    getProducts = (params) => {
        return this.manager.getProducts(params)
    }
    addProduct = (params) => {
        return this.manager.addProduct(params)
    }
    getProductById = (pid) => {
        return this.manager.getProductById(pid)
    }
    updateProductById = (pid, params) => {
        return this.manager.updateProductById(pid, params)
    }
    deleteProductById = (pid) => {
        return this.manager.deleteProductById(pid)
    }
    decreaseStockManyProducts = (purchasedProducts) => {
        return this.manager.decreaseStockManyProducts(purchasedProducts)
    }
}