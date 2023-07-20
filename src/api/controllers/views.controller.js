import { productsValidator } from '../validations/products.validation.js'
import { Services } from "../services/services.js";
import { DTOs } from '../dto/dtos.js';

const productsService = Services.products
const cartsService = Services.carts

export class ViewsController {
  currentUser = async (req, res) => {
    const user = req.user    
    const currentUser = DTOs.currentUser(user).data

    if(currentUser.role === "admin"){
      return res.render('current-admin', { user: currentUser })
    }

    res.render('currentUser', { user: currentUser })
  }

  displayProducts = async (req, res) => {
    const queries = req.query
    // Validation Stage
    const { isValid, mappedQueries } = productsValidator.validateQueries(queries)
    if (!isValid) return res.sendResponse.badRequest()

    // Query to service
    mappedQueries.limit = 2
    const products = await productsService.getPaginatedProducts(mappedQueries)
    const { docs, ...paginationParams } = products

    const user = req.user    
    const currentUser = DTOs.currentUser(user).data

    if(currentUser.role === "admin"){
      return res.render('products-admin', { user: currentUser, products: docs, paginationParams })
    }

    return res.render('products', { user: currentUser, products: docs, paginationParams })
  }
  realTimeProducts = async (req, res) => {
    const products = await productsService.getProducts()
    res.render('realtimeproducts', { products })
  }

  displayCart = async (req, res) => {
    const productsInCart = await cartsService.getCartProducts(req.user.cart)

    res.render('cart', { products: productsInCart.products })
  }

  displayChat = async (req, res) => {
    res.render('chat')
  }

  displayLogin = async (req, res) => {
    res.render('login')
  }
  displayRegister = async (req, res) => {
    res.render('register')
  }
}
