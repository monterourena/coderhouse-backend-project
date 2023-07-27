import { CartsServices } from './carts.services.js'
import { ChatServices } from './chat.services.js'
import { ProductsServices } from './products.services.js'
import { UsersServices } from './users.services.js'
import { MocksServices } from './mocks.services.js'


import PersistencesFactory from '../dao/dao-factory.js'

const managers = await PersistencesFactory.getPersistences()

export const Services = {
  carts: new CartsServices(managers.carts),
  chat: new ChatServices(managers.chat),
  products: new ProductsServices(managers.products),
  users: new UsersServices(managers.users),
  mocks: new MocksServices()
}
