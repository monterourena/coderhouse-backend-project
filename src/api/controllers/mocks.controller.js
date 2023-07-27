import { Services } from '../services/services.js'

export class MocksController {
  getMockProducts = async (req, res) => {
    const AMOUNT_OF_PRODUCTS = 100
    let products = []
    for (let i = 0; i < AMOUNT_OF_PRODUCTS; i++) {
      products.push(Services.mocks.createProduct())
    }
    res.sendSuccess({ data: products })
  }
}
