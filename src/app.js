// CONFIGURATION
import { app, io } from "./config.js";

// ROUTERS
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.js";
import ioMiddleware from "./middlewares/io.js";

// MIDDLEWARES
app.use(ioMiddleware)

// ROUTES
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter)


io.on("connection", (socket)=>{
    console.log("New client connected. ID: ",socket.id)
})