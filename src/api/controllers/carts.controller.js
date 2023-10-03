import { Services } from '../services/services.js'
import { DTOs } from '../dto/dtos.js'

const cartsService = Services.carts
const ticketsService = Services.tickets
const usersService = Services.users
const productsService = Services.products

export class CartsController {
  createCart = async (req, res) => {
    const response = await cartsService.createCart()
    res.sendCreated({ data: response })
  }
  getCartProducts = async (req, res) => {
    const { cid } = req.params
    const products = await cartsService.getCartProducts(cid)
    res.sendSuccess({ data: products })
  }
  addProductToCart = async (req, res) => {
    const { cid, pid } = req.params
    const quantity = parseInt(req.body.quantity)

    if (!quantity) {
      res.sendBadRequest({ message: { cid, pid } })
    }

    const response = await cartsService.addProductToCart(cid, pid, quantity)
    res.sendSuccess({ data: response })
  }

  updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params
    const quantity = parseInt(req.body.quantity)
    const result = await cartsService.updateProductQuantity(cid, pid, quantity)
    res.sendSuccess({ data: result })
  }

  updateCartContent = async (req, res) => {
    const { cid } = req.params
    const { cartContent } = req.body

    await cartsService.clearCartContent(cid)

    for (const product of cartContent) {
      await cartsService.addProductToCart(cid, product.pid, product.quantity)
    }
    res.sendSuccess()
  }
  deleteCartContent = async (req, res) => {
    const { cid } = req.params
    const response = await cartsService.clearCartContent(cid)
    res.sendSuccess({ data: response })
  }
  deleteOneProduct = async (req, res) => {
    const { cid, pid } = req.params
    const result = await cartsService.deleteOneProduct(cid, pid)
    res.sendSuccess({ data: result })
  }

  purchaseCart = async (req, res) => {
    try {
      const { cid } = req.params
      const cartData = await cartsService.getCartProducts(cid)
      const cartOwner = await usersService.getUserBy({ cart: cid })
      const ticket = DTOs.ticket(cartData, cartOwner)
      await productsService.decreaseStockManyProducts(ticket.purchasedItemsMetadata)
      await cartsService.deleteManyProducts(cid, ticket.purchasedItemsMetadata)
      const response = await ticketsService.createTicket(ticket.details)
      const hasNonPurchasableItem = ticket.cartProducts.length != ticket.purchasedItems.length

      // Enviar Email aquí

      return res.sendSuccess({ data: response })

    } catch (error) {
      if (error.name === 'CastError') {
        return res.sendBadRequest({ message: 'Invalid Cart ID' })
      }
      return res.sendInternalServerError()
    }
  }
}
