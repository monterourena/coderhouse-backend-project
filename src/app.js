// CONFIGURATION
import { app, PORT } from "./config.js";

// ROUTERS
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";

// ROUTES
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// LISTENER
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
