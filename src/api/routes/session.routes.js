
import { sessionController } from '../controllers/session.controller.js'
import { passportCall } from '../middlewares/passport.middleware.js'
import Router from './router.js'
export default class SessionRouter extends Router{
    routes(){
        this.post('/register', passportCall('register') ,sessionController.registerUser)
        this.post('/login', passportCall('login') ,sessionController.loginUser)
        this.post('/endSession', sessionController.endSession)
        
        this.get('/github-auth', passportCall('github'))
        this.get('/github-auth-callback',passportCall('github'), sessionController.githubAuthCallback )
    }
}