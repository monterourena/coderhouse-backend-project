import CartsModel from "../../models/fileSystem/carts.js";
import ProductsModel from "../../models/fileSystem/products.js";

const controller = {};
const cartsModel = new CartsModel("carts.json");
const productsModel = new ProductsModel("products.json")

controller.getCartProducts = async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = await cartsModel.getCartById(cartId);

  if(!!cart){
    res.status(201).send(cart.products)
    return cart.products
  }

  res.status(404).send({message: `Cart ID ${cartId} not found`})
  return undefined
};

controller.createCart = async (req, res) => {
  const cart = await cartsModel.createCart();
  cart ? res.status(201).send(cart) : res.status(500).send({message:"Internar error: Cart has not been created"});
};

controller.addProductToCart = async (req, res) => {
  const cartId = parseInt(req.params.cid)
  const cartById = await cartsModel.getCartById(parseInt(cartId))

  if(!cartById){
    res.status(400).send({message:"Cart ID not found"})
    return undefined
  }


  const productId = parseInt(req.params.pid)
  const productById = await productsModel.getProductById(productId)

  if(!productById){
    res.status(400).send({message:"Product ID not found"})
    return undefined
  }

  // Product exists in stock and cart exists

  const productsInCart = cartById.products
  const productStock = productById.stock
  const MIN_STOCK = 1

  let productToAdd = null 
  let updatedCart = null;
 
  if(!productsInCart.length){ // If cart is empty, we do not need to search for the product in cart 
    if(!( productStock >= MIN_STOCK)){  // If stock is not enough
      res.status(400).send({message:"Stock is not enough for this product"})
      return undefined
    } 
    productToAdd = {id:productId, quantity: 1}
    updatedCart = await cartsModel.addProductToCart(cartId, productToAdd);
    res.status(200).send({message:"Product added to cart successfully", updatedCart: updatedCart})
    return updatedCart
  }

  // Cart is not empty, product exists and cart exists
 
  const productInCart = productsInCart.find((product)=> product.id === productId)

  if(!productInCart){ // If product is not in cart
    if(!( productStock >= MIN_STOCK)){  // If stock is not enough
      res.status(400).send({message:"Stock is not enough for this product"})
      return undefined
    } 
    productToAdd = {id:productId, quantity: 1}
    updatedCart = await cartsModel.addProductToCart(cartId, productToAdd);
    res.status(200).send({message:"Product added to cart successfully", updatedCart: updatedCart})
    return updatedCart
  }


  // Product is in cart
  const quantityInCart = productInCart.quantity
  if(!( productStock >=quantityInCart + MIN_STOCK)){ // If stock is not enough
    res.status(400).send({message:"Stock is not enough for this product"})
    return undefined
  } 
  const newQuantity= quantityInCart + 1
  productToAdd = {id:productId, quantity: newQuantity}
  updatedCart = await cartsModel.addProductToCart(cartId, productToAdd);
  res.status(200).send({message:"Product added to cart successfully", updatedCart: updatedCart})
  return updatedCart

};

export default controller;
