import Router from './router.js'
import { Middlewares } from '../middlewares/middlewares.js'

const multer = Middlewares.multerAny

export default class UsersRouter extends Router {
  routes() {
    this.get('/', this.usersController.getAllUsers)
    this.delete('/', this.usersController.deleteInactiveUsers)
    this.post('/:uid/documents', multer, this.usersController.uploadDocuments)
    this.post('/premium/:uid', this.usersController.togglePremiumRole)
  }
}
