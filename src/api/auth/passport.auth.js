// Libraries
import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import { passportCall } from '../middlewares/passport.middleware.js'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

// Passport rules
import { githubRules, registerRules, loginRules, jwtRules } from './passport.rules.js'
import { jwtCookieExtractor } from '../../utils/jwt.utils.js'

// Strategies name
const registerStrategyName = 'register'
const loginStrategyName = 'login'
const githubStrategyName = 'github'
const jwtStrategyName = 'current'

// Strategies configuration
const registerConfig = { passReqToCallback: true, usernameField: 'email' }
const loginConfig = { usernameField: 'email' }
const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
}
const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([jwtCookieExtractor]),
  secretOrKey: process.env.JWT_SECRET
}

// Passport initialization
const initializePassport = () => {
  const localStrategy = local.Strategy
  passport.use(registerStrategyName, new localStrategy(registerConfig, registerRules))
  passport.use(loginStrategyName, new localStrategy(loginConfig, loginRules))
  passport.use(githubStrategyName, new GithubStrategy(githubConfig, githubRules))
  passport.use(jwtStrategyName, new JWTStrategy(jwtConfig, jwtRules))
}

export {initializePassport}