import { AUTH } from '../../constants/constants.js'
import { Services } from '../services/services.js'

const updateDeleteProductPolicy = async (req, res, next) => {
  const pid = req.params.pid
  const uid = req.params.uid

  const productsService = Services.products
  const usersService = Services.users

  const user = await usersService.getUserBy({ _id: uid })
  const product = await productsService.getProductById(pid)

  if (user.role === AUTH.ROLES.USER) {
    return res.sendForbidden({ message: 'Regular users cannot update/delete products' })
  }

  if (user.role === AUTH.ROLES.PREMIUM && product.owner !== uid) {
    return res.sendForbidden({ message: 'Premium users can only update/delete their own products' })
  }

  next()
}

export { updateDeleteProductPolicy }
