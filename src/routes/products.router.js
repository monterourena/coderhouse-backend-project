import { Router } from "express";

import ProductManager from "../managers/product-manager.js";

const productManager = new ProductManager("products.json");

const router = Router();

router.get("/", async (req, res) => {

  const products = await productManager.getProducts();
  const limit = parseInt(req.query.limit) || products.length

  res.send(products.slice(0,limit));
});

router.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  const result = await productManager.getProductById(id);
  res.send(result);
});





export default router;
