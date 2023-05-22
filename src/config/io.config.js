import { Server } from "socket.io";
import { server } from "./express.config.js";

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("New client connected. ID: ",socket.id)
});

export {io}