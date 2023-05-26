import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js"

const router = Router()

router.get("/products", viewsController.displayProducts);
router.get("/realtimeproducts", viewsController.realTimeProducts);
router.get("/chat", viewsController.displayChat)


export {router as viewsRouter}