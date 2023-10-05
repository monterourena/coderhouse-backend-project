import { productsValidator } from '../validations/products.validation.js'
import { Services } from "../services/services.js";
import { DTOs } from '../dto/dtos.js';
import { decodeToken } from '../../utils/jwt.utils.js';
import userUtils from '../../utils/users.utils.js';

const productsService = Services.products
const cartsService = Services.carts
const usersService = Services.users

export class ViewsController {

  home=async (req, res) => {
    res.render('home')
  }


  currentUser = async (req, res) => {
       
    const currentUser = DTOs.user(req.user).data

    if(currentUser.role === "admin"){
      return res.render('current-admin', { user: currentUser })
    }

    const user = await usersService.getUserBy({_id: req.user.id })
    const hasDocuments = userUtils(user).hasValidDocuments

    res.render('currentUser', { user: currentUser, hasDocuments, uid: req.user.id })
  }
  displayUsers=async (req, res) => {

    let users = await usersService.getAllUsers('email first_name role')

    users = users.map((user)=> DTOs.user(user).nameEmailRole)

    res.render('users', {users})
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
    const currentUser = DTOs.user(user).data

    if(currentUser.role === "admin"){
      return res.render('products-admin', { user: currentUser, products: docs, paginationParams })
    }

    return res.render('products', { user: currentUser, products: docs, paginationParams })
  }
  displayCart = async (req, res) => {
    const productsInCart = await cartsService.getCartProducts(req.user.cart)
    res.render('cart', { products: productsInCart?.products, cid: req.user.cart })
  }
  displayLogin = async (req, res) => {
    res.render('login')
  }
  displayRegister = async (req, res) => {
    res.render('register')
  }
  resetPasswordRequest = async (req, res) =>{
    res.render('reset-password-request')
  }
  restorePassword = async(req, res) => {
    const {token} = req.query
    const decodedToken = decodeToken(token)
    if(!decodedToken) return res.render('reset-password-expired')
    res.render('reset-password')
  }
}
