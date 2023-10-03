import { CartsManager } from './carts.manager.js'
import { ProductsManager } from './products.manager.js'
import { TicketsManager } from './ticket.manager.js'
import { UsersManager } from './users.manager.js'

const Managers = {
  carts: new CartsManager(),
  products: new ProductsManager(),
  users: new UsersManager(),
  tickets: new TicketsManager(),
}

export default Managers
