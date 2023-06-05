// CONFIGURATION
import "./config/env.config.js"
import "./config/mongodb.config.js"
import "./config/io.config.js"

import { app } from "./config/express.config.js";


// ROUTERS
import {productsRouter} from "./api/routes/products.routes.js"
import {cartsRouter} from "./api/routes/carts.routes.js"
import {viewsRouter} from "./api/routes/views.routes.js"

// MIDDLEWARES
import {ioMiddleware} from "./api/middlewares/io.middleware.js";
import { responseMiddleware } from "./api/middlewares/response.middleware.js";
app.use(ioMiddleware)
app.use(responseMiddleware)

// ROUTES

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter)
