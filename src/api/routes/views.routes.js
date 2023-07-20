import Router from "./router.js";
import { viewsController } from "../controllers/views.controller.js";
import { routingPolicy, requiredRole } from "../middlewares/auth.middleware.js";

export default class ViewsRouter extends Router{
  routes(){
    this.get( "/current",
      routingPolicy("AUTH_USERS_ONLY"),
      viewsController.currentUser
    );
    this.get( "/products",
      routingPolicy("AUTH_USERS_ONLY"),
      requiredRole(["admin", "user"]),
      viewsController.displayProducts
    );
    this.get( "/cart",
      routingPolicy("AUTH_USERS_ONLY"),
      viewsController.displayCart
    );
    this.get( "/realtimeproducts",
      routingPolicy("AUTH_USERS_ONLY"),
      viewsController.realTimeProducts
    );
    this.get( "/chat",
      routingPolicy("AUTH_USERS_ONLY"),
      viewsController.displayChat
    );
    
    this.get( "/login",
      routingPolicy("NOT_AUTH_USERS_ONLY"),
      viewsController.displayLogin
    );
    this.get( "/register",
      routingPolicy("NOT_AUTH_USERS_ONLY"),
      viewsController.displayRegister
    );

  }
}


