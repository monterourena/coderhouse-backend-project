import Router from './router.js'
import { routingPolicy, requiredRole } from '../middlewares/auth.middleware.js'
import { AUTH } from '../../constants/constants.js'
export default class ViewsRouter extends Router {
  routes() {
    this.get('/', routingPolicy('NOT_AUTH_USERS_ONLY'), this.viewsController.home)
    this.get('/current', routingPolicy('AUTH_USERS_ONLY'), this.viewsController.currentUser)
    this.get('/products', routingPolicy('AUTH_USERS_ONLY'), this.viewsController.displayProducts)
    this.get(
      '/users',
      routingPolicy('AUTH_USERS_ONLY'),
      requiredRole([AUTH.ROLES.ADMIN]),
      this.viewsController.displayUsers
    )
    this.get('/cart', routingPolicy('AUTH_USERS_ONLY'), this.viewsController.displayCart)
    this.get('/login', routingPolicy('NOT_AUTH_USERS_ONLY'), this.viewsController.displayLogin)
    this.get('/register', routingPolicy('NOT_AUTH_USERS_ONLY'), this.viewsController.displayRegister)
    this.get(
      '/resetPasswordRequest',
      routingPolicy('NOT_AUTH_USERS_ONLY'),
      this.viewsController.resetPasswordRequest
    )
    this.get('/restorePassword', routingPolicy('NOT_AUTH_USERS_ONLY'), this.viewsController.restorePassword)
  }
}
