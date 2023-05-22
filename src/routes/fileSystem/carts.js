import { Router } from "express";
import cartsController from "../../controllers/fileSystem/carts.js";

const router = Router()

router.post("/", cartsController.createCart)
router.get("/:cid", cartsController.getCartProducts)
router.post("/:cid/product/:pid", cartsController.addProductToCart)


export default router;