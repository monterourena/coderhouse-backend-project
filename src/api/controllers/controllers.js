import { CartsController } from './carts.controller.js'
import { ProductsController } from './products.controller.js'
import { SessionController } from './session.controller.js'
import { ViewsController } from './views.controller.js'
import { UsersController } from './users.controller.js'


export const Controllers = {
  carts: new CartsController(),
  products: new ProductsController(),
  session: new SessionController(),
  views: new ViewsController(),
  users: new UsersController()

}
