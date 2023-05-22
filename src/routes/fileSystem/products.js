import { Router } from "express";
import productsController from "../../controllers/fileSystem/products.js";

const router = Router();

router.get("/", productsController.getProducts);
router.post("/", productsController.addProduct)
router.get("/:pid", productsController.getProductById);
router.put("/:pid",productsController.updateProductById)
router.delete("/:pid",productsController.deleteProductById)

export default router;
