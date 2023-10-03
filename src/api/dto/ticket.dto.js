import UUID from '../../utils/uuid.utils.js'

export default class TicketsDTO {
  constructor(cart, cartOwner) {
    this.code = UUID.generate()
    this.cartOwner = cartOwner
    this.cartProducts = cart.products
    this.purchasedItems = this.#purchasedItems()
  }

  #getAmount = () => {
    let total = 0
    this.cartProducts.forEach((product) => {
      total += product.quantity * product.product.price
    })

    return total
  }
  #purchasableProducts = () => {
    return this.cartProducts.filter((product) => product.product.stock >= product.quantity)
  }

  #purchasedItems = () =>
    this.#purchasableProducts().map((product) => {
      return {
        name: product.product.title,
        quantity: product.quantity,
        price: product.product.price
      }
    })

  get purchasedItemsMetadata() {
    return this.#purchasableProducts().map((product) => {
      return {
        id: product.product._id,
        quantity: product.quantity
      }
    })
  }

  get details() {
    return {
      code: this.code,
      purchaser: this.cartOwner._id,
      amount: this.#getAmount(),
      purchasedItems: this.purchasedItems
    }
  }
}
