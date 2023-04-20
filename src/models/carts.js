// Libraries
import fs from "fs";

class Cart {
  constructor(id) {
    this.id = id;
    this.products = [];
  }
}

class CartsManager {
  constructor(FileNameWithExtension) {
    this.path = `./src/data/${FileNameWithExtension}`;
  }

  #getNewId = async (object) => {
    const objectLength = object.length;
    console.log("Object Length: ",objectLength)
    return objectLength === 0 ? 0 : object[objectLength - 1].id + 1;
  };

  #readCartsFromFile = async () => {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      return undefined;
    }
  };

  #writeCartsToFile = async (carts) => {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return carts;
    } catch (error) {
      return undefined;
    }
  };

  createCart = async () => {
    try {
      const carts = await this.#readCartsFromFile();
      const newId = await this.#getNewId(carts);
      const newCart = new Cart(newId);
      await this.#writeCartsToFile([...carts, newCart]);
      return newCart;
    } catch (error) {
      return undefined;
    }
  };
}

export default CartsManager;
