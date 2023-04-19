import ProductModel from "../models/products.js";

const productModel = new ProductModel("products.json");

const controller = {};

controller.getProducts = async (req, res) => {
  const allProducts = await productModel.getProducts();
  
  if(allProducts === undefined){
    res.status(500).send();
  }
  else{
    const limit = parseInt(req.query.limit) || allProducts.length;
    const productsWithLimit = allProducts.slice(0, limit)
    res.status(200).send(productsWithLimit);
  }

};

controller.getProductById = async (req, res) => {
  const id = req.params.pid;
  const result = await productModel.getProductById(id);
  result === undefined ? res.status(404).send() : res.status(200).send(result);
};

controller.addProduct = async (req, res)=>{
  const product = req.body
  const productAdded = await productModel.addProduct(product);
  productAdded === undefined ? res.status(400).send() : res.status(201).send(productAdded);
}

export default controller;
