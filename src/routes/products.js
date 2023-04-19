import { Router } from "express";
import productsController from "../controllers/products.js";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
router.post("/", productsController.addProduct)

export default router;
