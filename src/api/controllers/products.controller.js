import { productsValidator } from '../validations/products.validation.js'
import { Services } from '../services/services.js'
import { DTOs } from '../dto/dtos.js'
import { AUTH } from '../../constants/constants.js'

const productsService = Services.products
const usersService = Services.users

export class ProductsController {
  getProducts = async (req, res) => {
    const queries = req.query

    // Validation Stage
    const { isValid, mappedQueries } = productsValidator.validateQueries(queries)
    if (!isValid) return res.sendResponse.badRequest()

    // Query to service
    const products = await productsService.getPaginatedProducts(mappedQueries)
    const { docs, ...paginationParams } = products

    res.sendSuccess({ data: docs, ...paginationParams })
  }
  addProduct = async (req, res) => {
    try {
      const owner = await usersService.getUserBy({ _id: req.body.owner })
      const ownerRole = owner.role

      if (ownerRole !== AUTH.ROLES.PREMIUM && ownerRole !== AUTH.ROLES.ADMIN) {
        return res.sendForbidden({ message: 'Only Administrators or Premium users can create products' })
      }

      const product = DTOs.newProduct(req.body).data
      const result = await productsService.addProduct(product)

      res.sendCreated({ data: result })
    } catch (error) {
      res.sendInternalServerError({ message: error })
    }
  }

  getProductById = async (req, res) => {
    const pid = req.params.pid
    const product = await productsService.getProductById(pid)
    res.sendSuccess({ data: product })
  }
  updateProductById = async (req, res) => {
    const pid = req.params.pid
    const params = req.body
    const updatedProduct = await productsService.updateProductById(pid, params)
    res.sendSuccess({ data: updatedProduct })
  }
  deleteProductById = async (req, res) => {
    const pid = req.params.pid
    const deletedProduct = await productsService.deleteProductById(pid)
    res.sendSuccess({ data: deletedProduct })
  }
}
