import { CartsManager } from './carts.manager.js'
import { ProductsManager } from './products.manager.js'
import { UsersManager } from './users.manager.js'

const Managers = {
  carts: new CartsManager(),
  products: new ProductsManager(),
  users: new UsersManager()
}

export default Managers
