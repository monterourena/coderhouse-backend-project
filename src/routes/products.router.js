import { Router } from "express";

import ProductManager from "../managers/product-manager.js";

const productManager = new ProductManager("products.json");

const router = Router();

router.get("/", async (req, res) => {
  const result = await productManager.getProducts();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await productManager.getProductById(id);
  res.send(result);
});

export default router;
