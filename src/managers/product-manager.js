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
    this.path = `./src/data/${filenameWithExtension}`;
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

  async #setID(products, product) {
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
    await this.#writeProductsToFile(products);

    console.log(SUCCESS_MESSAGE, productWithID); // Console.log
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const ERROR_MESSAGE =
      "Invalid product: missing parameters or repeated product code";

    let products = await this.#readProductsFromFile();

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
    const products = await this.#readProductsFromFile();
    return products;
  }

  async #manageProductById(type, id, newProperties) {
    const ERROR_MESSAGE = "Not found";
    const SUCCESS_MESSAGE = "Successful operation";

    const products = await this.#readProductsFromFile();

    if (type === "get") {
      const productById = await products.find((product) => product.id == id);

      if (productById === undefined) {
        console.error(ERROR_MESSAGE);
        return null;
      }

      console.log(SUCCESS_MESSAGE, productById);
      return productById;
    }

    const indexById = await products.findIndex((product) => product.id == id);

    if (indexById === -1) {
      console.error(ERROR_MESSAGE);
      return null;
    }

    if (type === "update") {
      let originalProduct = products[indexById];
      const originalProductId = originalProduct.id;

      // No matter what id is given, it will keep the original one.
      // If a key does not exist, it is added, if it exists it is updated.

      products[indexById] = {
        ...originalProduct,
        ...newProperties,
        id: originalProductId,
      };

      console.log(SUCCESS_MESSAGE, products[indexById]);

      await this.#writeProductsToFile(products);
      return originalProduct;
    }
    if (type === "delete") {
      products.splice(indexById, 1);
      console.log(SUCCESS_MESSAGE);

      await this.#writeProductsToFile(products);
    }
  }

  async getProductById(id) {
    const type = "get";
    await this.#manageProductById(type, id);
  }

  async updateProduct(id, object) {
    const type = "update";
    await this.#manageProductById(type, id, object);
  }

  async deleteProduct(id) {
    const type = "delete";
    await this.#manageProductById(type, id);
  }
}

export default ProductManager;
