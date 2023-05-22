// CONFIGURATION
import "./config/env.config.js"
import "./config/mongodb.config.js"
import "./config/io.config.js"

import { app } from "./config/express.config.js";


// ROUTERS
import fileSystemProductsRouter from "./routes/fileSystem/products.js";
import fileSystemCartsRouter from "./routes/fileSystem/carts.js";
import fileSystemViewsRouter from "./routes/fileSystem/views.js";
import ioMiddleware from "./middlewares/io.js";

import {productsRouter} from "./routes/products.routes.js"
import {cartsRouter} from "./routes/carts.routes.js"
import {viewsRouter} from "./routes/views.routes.js"

// MIDDLEWARES
app.use(ioMiddleware)

// ROUTES
app.use("/api/fileSystem/products", fileSystemProductsRouter);
app.use("/api/fileSystem/carts", fileSystemCartsRouter);
app.use("/fileSystem/", fileSystemViewsRouter)


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter)
