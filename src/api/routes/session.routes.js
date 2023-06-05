import { Router } from "express";
import { sessionController } from "../controllers/session.controller.js";

const router = Router()

router.post("/register", sessionController.registerUser)
router.post("/login", sessionController.loginUser)
router.post("/endSession", sessionController.endSession)




export {router as sessionRouter}