import UUID from "../../utils/uuid.utils.js"

export default class NewProductDTO {
    constructor(product) {
      this.code = UUID.generate()
      this.title = product.title
      this.description = product.description
      this.price = product.price
      this.status =product.status
      this.stock =product.stock
      this.category = product.category
      this.thumbnails = product.thumbnails
      this.owner = product.owner || 'ADMIN'
    }

    get data() {
      return {
        code: this.code,
        title: this.title,
        description: this.description,
        price: this.price,
        status: this.status,
        stock: this.stock,
        category: this.category,
        thumbnails: this.thumbnails,
        owner: this.owner
      }
    }
  }
  