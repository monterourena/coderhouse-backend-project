import { Router } from "express";
import cartsController from "../controllers/carts.js";

const router = Router()

router.post("/", cartsController.createCart)
router.get("/:cid", cartsController.getCarts)
router.post("/:cid/product/:pid", cartsController.addProductToCart)


export default router;