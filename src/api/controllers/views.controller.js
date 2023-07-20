import { productsValidator } from '../validations/products.validation.js'
import { Services } from "../services/services.js";

const productsService = Services.products
const cartsService = Services.carts

export class ViewsController {
  currentUser = async (req, res) => {
    res.render('currentUser', { user: req.user })
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

    res.render('products', { user: req.user, products: docs, paginationParams })
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
