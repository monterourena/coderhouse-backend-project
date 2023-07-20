import Router from "./router.js";
import { routingPolicy, requiredRole } from "../middlewares/auth.middleware.js";
export default class ViewsRouter extends Router{
  routes(){
    this.get( "/current",
      routingPolicy("AUTH_USERS_ONLY"),
      this.viewsController.currentUser
    );
    this.get( "/products",
      routingPolicy("AUTH_USERS_ONLY"),
      requiredRole(["admin", "user"]),
      this.viewsController.displayProducts
    );
    this.get( "/cart",
      routingPolicy("AUTH_USERS_ONLY"),
      this.viewsController.displayCart
    );
    this.get( "/realtimeproducts",
      routingPolicy("AUTH_USERS_ONLY"),
      this.viewsController.realTimeProducts
    );
    this.get( "/chat",
      routingPolicy("AUTH_USERS_ONLY"),
      this.viewsController.displayChat
    );
    
    this.get( "/login",
      routingPolicy("NOT_AUTH_USERS_ONLY"),
      this.viewsController.displayLogin
    );
    this.get( "/register",
      routingPolicy("NOT_AUTH_USERS_ONLY"),
      this.viewsController.displayRegister
    );

  }
}


