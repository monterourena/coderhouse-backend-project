import passport from 'passport'
import { Router } from 'express'
import { sessionController } from '../controllers/session.controller.js'
import { registerStrategy, loginStrategy, githubStrategy } from '../auth/passport.auth.js'

const router = Router()

router.post('/register', registerStrategy ,sessionController.registerUser)
router.get('/failedRegister', sessionController.failedRegister)

router.post('/login', loginStrategy ,sessionController.loginUser)
router.post('/failedLogin', sessionController.failedLogin)



router.post('/endSession', sessionController.endSession)

router.get('/github-auth', githubStrategy)
router.get('/github-auth-callback',githubStrategy, sessionController.githubAuthCallback )

export { router as sessionRouter }
