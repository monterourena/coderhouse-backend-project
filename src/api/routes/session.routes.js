import Router from './router.js'
import { passportCall } from '../middlewares/passport.middleware.js'

export default class SessionRouter extends Router {
  routes() {
    this.get('/healthCheck', this.sessionController.healthCheck)
    this.post('/register', passportCall('register'), this.sessionController.registerUser)
    this.post('/login', passportCall('login'), this.sessionController.loginUser)
    this.post('/endSession', this.sessionController.endSession)
    this.post('/sendPasswordReset', this.sessionController.sendPasswordReset)
    this.post('/restorePassword', this.sessionController.restorePassword)

    this.get('/github-auth', passportCall('github'))
    this.get('/github-auth-callback', passportCall('github'), this.sessionController.githubAuthCallback)
  }
}
