import { Router } from "express";
import viewsController from "../../controllers/fileSystem/views.js";

const router = Router();

router.get("/home", viewsController.displayProducts);

router.get("/realtimeproducts", viewsController.realTimeProducts);

export default router;
