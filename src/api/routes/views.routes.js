import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js";
import { routingPolicy, requiredRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.get( "/products",
  routingPolicy("AUTH_USERS_ONLY"),
  requiredRole(["admin", "user"]),
  viewsController.displayProducts
);
router.get( "/cart",
  routingPolicy("AUTH_USERS_ONLY"),
  viewsController.displayCart
);
router.get( "/realtimeproducts",
  routingPolicy("AUTH_USERS_ONLY"),
  viewsController.realTimeProducts
);
router.get( "/chat",
  routingPolicy("AUTH_USERS_ONLY"),
  viewsController.displayChat
);

router.get( "/login",
  routingPolicy("NOT_AUTH_USERS_ONLY"),
  viewsController.displayLogin
);
router.get( "/register",
  routingPolicy("NOT_AUTH_USERS_ONLY"),
  viewsController.displayRegister
);

export { router as viewsRouter };
