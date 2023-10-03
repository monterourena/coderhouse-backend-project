import { CartsServices } from './carts.services.js'
import { ProductsServices } from './products.services.js'
import { UsersServices } from './users.services.js'
import { TicketsServices } from './tickets.service.js'


import PersistencesFactory from '../dao/dao-factory.js'

const managers = await PersistencesFactory.getPersistences()

export const Services = {
  carts: new CartsServices(managers.carts),
  products: new ProductsServices(managers.products),
  users: new UsersServices(managers.users),
  tickets: new TicketsServices(managers.tickets)
}
