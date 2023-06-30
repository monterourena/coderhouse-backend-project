import passport from 'passport'
import { Router } from 'express'
import { sessionController } from '../controllers/session.controller.js'
import { passportCall } from '../middlewares/passport.middleware.js'

const router = Router()

router.post('/register', passportCall('register') ,sessionController.registerUser)
router.post('/login', passportCall('login') ,sessionController.loginUser)
router.post('/endSession', sessionController.endSession)

router.get('/github-auth', passportCall('github'))
router.get('/github-auth-callback',passportCall('github'), sessionController.githubAuthCallback )

export { router as sessionRouter }
