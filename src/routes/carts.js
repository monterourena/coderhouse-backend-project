import { Router } from "express";
import cartsController from "../controllers/carts.js";

const router = Router()

router.get("/:cid", cartsController.getCarts)


export default router;