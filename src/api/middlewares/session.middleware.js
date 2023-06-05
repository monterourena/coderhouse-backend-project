
import MongoStore from "connect-mongo"
import session from "express-session"
import { app } from "../../config/express.config.js";

import {MONGODB_CONNECTION_URI} from "../../config/mongodb.config.js"
const SESSIONS_SECRET = process.env.SESSIONS_SECRET;
const SESSIONS_TTL = process.env.SESSIONS_TTL;


app.use(session({
    secret: SESSIONS_SECRET,
    resave: false,
    saveUninitialized:false,
    store: new MongoStore({
        mongoUrl: MONGODB_CONNECTION_URI,
        ttl:SESSIONS_TTL,
        autoRemove: 'native'
    })
}))

