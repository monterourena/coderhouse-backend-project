import { io } from "../config/io.config.js";

const ioMiddleware = (req, res, next)=>{
    req.io = io;
    next();
}

export {ioMiddleware};