import { cartModel } from './cart.model.js'
import { userModel } from './user.model.js'
import { productModel, productSchema } from './product.model.js'

export const Models = {
  cart: cartModel,
  product: productModel,
  user: userModel
}

export const Schemas = {
  product: productSchema
}