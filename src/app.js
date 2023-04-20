// LIBRARIES
import express from "express";

// ROUTERS
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";

// CONFIGURATION
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// LISTENER
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
