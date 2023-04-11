class Product {
  constructor(_title, _description, _price, _thumbnail, _code, _stock) {
    this.title = _title;
    this.description = _description;
    this.price = _price;
    this.thumbnail = _thumbnail;
    this.code = _code;
    this.stock = _stock;
    this.id = null;
  }
  isNull() {
    //True if is all the required values were sent
    return (
      !this.title ||
      !this.description ||
      !this.price ||
      !this.thumbnail ||
      !this.code ||
      !this.stock
    );
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  #setID(product) {
    const productsLength = this.products.length;
    productsLength == 0
      ? (product.id = 0)
      : (product.id = this.products[productsLength - 1].id + 1);
    return product;
  }

  #addValidatedProduct(product) {
    const SUCCESS_MESSAGE = "Product added";
    product = this.#setID(product);
    this.products.push(product);
    console.log(SUCCESS_MESSAGE, product); // Console.log
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const ERROR_MESSAGE =
      "Invalid product: missing parameters or repeated product code";

    const newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    const isInvalid =
      newProduct.isNull() ||
      this.products.some((product) => product.code == newProduct.code);

    if (!isInvalid) {
      this.#addValidatedProduct(newProduct);
    } else {
      console.error(ERROR_MESSAGE);
    } // Console.log
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const ERROR_MESSAGE = "Not found";
    const SUCCESS_MESSAGE = "Product found";

    const productById = this.products.find((product) => product.id == id);

    if (productById !== undefined) {
      console.log(SUCCESS_MESSAGE, productById);
      return productById;
    }
    console.error(ERROR_MESSAGE);
    return null;
  }
}



export default ProductManager;