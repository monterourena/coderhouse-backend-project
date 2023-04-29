import {io} from "../config.js"

const middleware = (req, res, next)=>{
    req.io = io;
    next();
}

export default middleware;