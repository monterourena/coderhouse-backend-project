import { Router } from 'express'
// import { Controllers } from '../controllers/controllers.js'
import { Middlewares } from '../middlewares/middlewares.js'
import { Controllers } from '../controllers/controllers.js'

export default class CoreRouter {
  constructor() {
    this.router = Router()
    this.routes()
  }

  // GET ROUTER / INIT ROUTES
  routes() {}
  router() {
    return this.router
  }

  // MIDDLEWARES
  customResponses = Middlewares.customResponses
  handlePolicies = Middlewares.routingPolicies

  // CONTROLLERS
  sessionController = Controllers.session
  viewsController = Controllers.views
  cartsController = Controllers.carts
  productsController = Controllers.products

  // ROUTES
  get(path, ...callbacks) {
    this.router.get(
        path, 
        // this.customResponses, 
        // this.handlePolicies(policies), 
        this.applyCallbacks(callbacks)
    )
  }
  post(path, ...callbacks) {
    this.router.post(
        path,
        // this.customResponses,
        // this.handlePolicies(policies),
        this.applyCallbacks(callbacks)
    )
  }
  put(path, ...callbacks) {
    this.router.put(
        path, 
        // this.customResponses, 
        // this.handlePolicies(policies), 
        this.applyCallbacks(callbacks)
    )
  }
  delete(path, ...callbacks) {
    this.router.delete(
        path,
        // this.customResponses,
        // this.handlePolicies(policies),
        this.applyCallbacks(callbacks)
    )
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        return await callback.apply(this, params)
      } catch (error) {
        params[1].status(500).send(error) //params[1] === res
      }
    })
  }
}
