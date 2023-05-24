// CONFIGURATION
import "./config/env.config.js"
import "./config/mongodb.config.js"
import "./config/io.config.js"

import { app } from "./config/express.config.js";


// ROUTERS
import {productsRouter} from "./routes/products.routes.js"
import {cartsRouter} from "./routes/carts.routes.js"
import {viewsRouter} from "./routes/views.routes.js"

// MIDDLEWARES
import {ioMiddleware} from "./middlewares/io.middleware.js";
app.use(ioMiddleware)

// ROUTES

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter)
