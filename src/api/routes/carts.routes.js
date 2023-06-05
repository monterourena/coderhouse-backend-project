import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js"

const router = Router()


router.post("/", cartsController.createCart)
router.get("/:cid", cartsController.getCartProducts)
router.post("/:cid/products/:pid", cartsController.addProductToCart)

router.put("/:cid/products/:pid",cartsController.updateProductQuantity)
router.put("/:cid",cartsController.updateCartContent)
router.delete("/:cid",cartsController.deleteCartContent)
router.delete("/:cid/products/:pid",cartsController.deleteOneProduct)






export {router as cartsRouter}