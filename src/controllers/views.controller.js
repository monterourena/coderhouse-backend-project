import { ProductsService } from "../services/products.service.js";

const controller = [];

const productsService = new ProductsService()

controller.displayProducts = async (req, res)=>{
    const products = await productsService.getProducts()
    res.render("home",{ products })
}
controller.realTimeProducts = async (req, res)=>{

    const products = await productsService.getProducts()
    res.render("realtimeproducts",{ products })
}


controller.displayChat = async (req, res)=>{
    res.render("chat")
}


export {controller as viewsController}