import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js"

const router = Router()


router.post("/", cartsController.createCart)
router.get("/:cid", cartsController.getCartProducts)
router.post("/:cid/products/:pid", cartsController.addProductToCart)



export {router as cartsRouter}