// Libraries
import fs from "fs";

class Product {
  constructor({title, description, code, price, status = true, stock, category, thumbnails}) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;
    this.id = null;
  }
  isNull() {
    //True if is all the required values were sent
    // Todo: Refactor this and use standard validations
    return (
      !this.title ||
      !this.description ||
      !this.code ||
      !this.price ||
      !this.stock ||
      !this.category
    );
  }
}

class ProductManager {
  constructor(filenameWithExtension) {
    this.path = `./src/data/${filenameWithExtension}`;
  }

  // Privated methods

  async #readProductsFromFile() {
    try {
      if(!fs.existsSync(this.path)){
        this.#writeProductsToFile([])
      }

      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      return undefined;
    }
  }

  async #writeProductsToFile(products) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      return undefined;
    }
  }

  async #setID(products, product) {
    const productsLength = products.length;
    productsLength == 0
      ? (product.id = 0)
      : (product.id = products[productsLength - 1].id + 1);
    return product;
  }

  async #addValidatedProduct(products, productWithoutID) {
    const productWithID = await this.#setID(products, productWithoutID);
    products.push(productWithID);
    await this.#writeProductsToFile(products);

    return productWithID
  }

  async #manageProductById(type, id, newProperties) {
    try {
      const products = await this.#readProductsFromFile();

      if (type === "get") {
        const productById = await products.find((product) => product.id == id);
        return productById;
      }

      const indexById = await products.findIndex((product) => product.id == id);

      if (indexById === -1) {
        return undefined; //Index not found
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

        await this.#writeProductsToFile(products);
        return products[indexById];
      }
      if (type === "delete") {
      
          products.splice(indexById, 1);
          await this.#writeProductsToFile(products);
          return products
      }
    } catch (error) {
      return undefined;
    }
  }

  // Public methods

  async addProduct(product) {
    // title, description, price, thumbnail, code, stock
    let products = await this.#readProductsFromFile();

    const newProduct = new Product(product);
    const isInvalid =
      newProduct.isNull() ||
      products.some((product) => product.code == newProduct.code);

    if (!isInvalid) {
      return await this.#addValidatedProduct(products, newProduct);
    } 
  }

  async getProducts() {
    const products = await this.#readProductsFromFile();
    return products;
  }

  async getProductById(id) {
    const type = "get";
    return await this.#manageProductById(type, id);
  }

  async updateProductById(id, object) {
    const type = "update";
    return await this.#manageProductById(type, id, object);
  }

  async deleteProductById(id) {
    const type = "delete";
    return await this.#manageProductById(type, id);
  }
}

export default ProductManager;
