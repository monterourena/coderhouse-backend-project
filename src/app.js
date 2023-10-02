import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express'

// CONFIGURATION
import "./config/env.config.js"

// EXPRESS SERVER
import { app } from "./config/express.config.js";

// ROUTERS
import ProductsRouter from "./api/routes/products.routes.js"
import CartsRouter from "./api/routes/carts.routes.js"
import ViewsRouter from "./api/routes/views.routes.js"
import SessionRouter from "./api/routes/session.routes.js";

// PASSPORT
import { initializePassport } from "./api/auth/passport.auth.js";
import { passportCall } from "./api/middlewares/passport.middleware.js";
import { __src } from "./utils/directories.utils.js";

// MIDDLEWARES
app.use(cookieParser())

// PASSPORT
initializePassport()
app.use(passportCall('current'))


// Swagger

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info:{
            title: 'Documentation Ecommerce',
            description: 'Main documentation description'
        }
    },
    apis:[`${__src}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

// ROUTES AND ROUTERS
const productsRouter = new ProductsRouter().router
const cartsRouter = new CartsRouter().router
const viewsRouter = new ViewsRouter().router
const sessionRouter = new SessionRouter().router


app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/session", sessionRouter);

