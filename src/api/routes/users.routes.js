import Router from "./router.js"
import { Middlewares } from "../middlewares/middlewares.js"

const multer = Middlewares.multerAny

export default class UsersRouter extends Router{
    routes(){
        this.get("/", this.usersController.getUsersBy)
        this.post("/:uid/documents", multer ,this.usersController.uploadDocuments)
    }
}

