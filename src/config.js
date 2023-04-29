// LIBRARIES
import express from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import { Server } from "socket.io";
// CONFIGURATION
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))

// HANDLEBARS

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views/`)
app.set("view engine", "handlebars")

// LISTENER
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
const io = new Server(server)


export {app, io}