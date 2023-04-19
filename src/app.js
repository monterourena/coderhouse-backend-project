// LIBRARIES
import express from "express";

// ROUTERS
import productsRouter from "./routes/products.js";

// CONFIGURATION
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/products", productsRouter);

// LISTENER
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));