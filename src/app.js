import passport from "passport"

// CONFIGURATION
import "./config/env.config.js"
import "./config/mongodb.config.js"
import "./config/io.config.js"

// EXPRESS SERVER
import { app } from "./config/express.config.js";

// ROUTERS
import {productsRouter} from "./api/routes/products.routes.js"
import {cartsRouter} from "./api/routes/carts.routes.js"
import {viewsRouter} from "./api/routes/views.routes.js"
import { sessionRouter } from "./api/routes/session.routes.js";

// MIDDLEWARES
import "./api/middlewares/session.middleware.js"
import {ioMiddleware} from "./api/middlewares/io.middleware.js";
import { responseMiddleware } from "./api/middlewares/response.middleware.js";

// PASSPORT
import { initializePassport } from "./api/auth/passport.auth.js";

// MIDDLEWARES
app.use(ioMiddleware)
app.use(responseMiddleware)

// PASSPORT
app.use(passport.initialize())
initializePassport()

// ROUTES

app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/session", sessionRouter);

