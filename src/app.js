import cookieParser from "cookie-parser";

// CONFIGURATION
import "./config/env.config.js"
import "./config/mongodb.config.js"
import "./config/io.config.js"

// EXPRESS SERVER
import { app } from "./config/express.config.js";

// ROUTERS
import ProductsRouter from "./api/routes/products.routes.js"
import CartsRouter from "./api/routes/carts.routes.js"
import ViewsRouter from "./api/routes/views.routes.js"
import SessionRouter from "./api/routes/session.routes.js";

// MIDDLEWARES
import {ioMiddleware} from "./api/middlewares/io.middleware.js";
import { responseMiddleware } from "./api/middlewares/response.middleware.js";


// PASSPORT
import { initializePassport } from "./api/auth/passport.auth.js";
import { passportCall } from "./api/middlewares/passport.middleware.js";

// MIDDLEWARES
app.use(cookieParser())
app.use(ioMiddleware)
app.use(responseMiddleware)

// PASSPORT
initializePassport()
app.use(passportCall('current'))

// ROUTES AND ROUTERS
const productsRouter = new ProductsRouter().router
const cartsRouter = new CartsRouter().router
const viewsRouter = new ViewsRouter().router
const sessionRouter = new SessionRouter().router


app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/session", sessionRouter);

