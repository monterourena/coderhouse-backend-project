// ! Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
// ! Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
// ! Usar persistencia en archivos

// Libraries
import fs from "fs";

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
  constructor(filenameWithExtension) {
    this.path = `./src/Products/${filenameWithExtension}`;
  }

  async #readProductsFromFile() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const data = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(data);
    return products;
  }

  async #writeProductsToFile(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  }

  async #setID(products ,product) {
    const productsLength = products.length;
    productsLength == 0
      ? (product.id = 0)
      : (product.id = products[productsLength - 1].id + 1);
    return product;
  }

  async #addValidatedProduct(products, productWithoutID) {
    const SUCCESS_MESSAGE = "Product added";
    const productWithID = await this.#setID(products, productWithoutID);
    products.push(productWithID);
    await this.#writeProductsToFile(products)

    console.log(SUCCESS_MESSAGE, productWithID); // Console.log
  }


  async addProduct(title, description, price, thumbnail, code, stock) {
    const ERROR_MESSAGE =
      "Invalid product: missing parameters or repeated product code";

    let products = await this.#readProductsFromFile()

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
      products.some((product) => product.code == newProduct.code);

    if (!isInvalid) {
      this.#addValidatedProduct(products, newProduct);
    } else {
      console.error(ERROR_MESSAGE);
    } // Console.log
  }

  async getProducts() {
    const products = await this.#readProductsFromFile()
    return products;
  }

  async getProductById(id) {
    const ERROR_MESSAGE = "Not found";
    const SUCCESS_MESSAGE = "Product found";

    const products = await this.#readProductsFromFile()

    const productById = products.find((product) => product.id == id);

    if (productById !== undefined) {
      console.log(SUCCESS_MESSAGE, productById);
      return productById;
    }
    console.error(ERROR_MESSAGE);
    return null;
  }
}

export default ProductManager;
