import { Server } from "socket.io";
import { server } from "./express.config.js";
import {chatHandler} from "../handlers/chat.handler.js"

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("New client connected. ID: ",socket.id)
    chatHandler(io, socket)
});

export {io}