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

controller.addProduct = async (req, res)=>{
  const product = req.body
  const productAdded = await productModel.addProduct(product);
  productAdded === undefined ? res.status(400).send() : res.status(201).send(productAdded);
}
controller.getProductById = async (req, res) => {
  const id = req.params.pid;
  const result = await productModel.getProductById(id);
  result === undefined ? res.status(404).send() : res.status(200).send(result);
};


controller.updateProductById = async (req, res)=>{
  const updatedProduct = req.body
  const productId = parseInt(req.params.pid)
  const resultingProduct = await productModel.updateProductById(productId,updatedProduct)

  resultingProduct 
    ? res.status(200).send(resultingProduct)
    : res.status(400).send({message:`Product ID ${productId} not found`})
}

controller.deleteProductById = async (req,res)=>{
  const productId = parseInt(req.params.pid)
  const allProducts = await productModel.deleteProductById(productId)

  allProducts 
    ? res.status(200).send({message: `Product ID ${productId} has been deleted`, products : allProducts})
    : res.status(200).send({message: `Product ID ${productId} not found`})  

}


export default controller;
