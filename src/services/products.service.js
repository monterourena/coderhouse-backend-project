import {productModel} from "../models/product.model.js"



class ProductsService{
    getProducts = (params) => productModel.find(params).lean();
    addProduct = (params) => productModel.create(params);
    getProductById = (pid) => productModel.findById(pid).lean();
    updateProductById = (pid,params) => productModel.findByIdAndUpdate(pid, {$set:params})
    deleteProductById = (pid) => productModel.findByIdAndDelete(pid);
    
}

export {ProductsService}