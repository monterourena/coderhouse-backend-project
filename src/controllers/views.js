import ProductsModel from "../models/products.js"

const controller = [];
const productsModel = new ProductsModel("../data/products.json")

controller.displayProducts = async (req, res)=>{
    const products = await productsModel.getProducts()
    res.render("home", {
        products: products
    })
}

controller.realTimeProducts = (req, res) =>{
    res.render("realTimeProducts")
}


export default controller;