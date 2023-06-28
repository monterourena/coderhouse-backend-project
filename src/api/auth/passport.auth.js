// Libraries
import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'

// Passport rules
import { githubRules, registerRules, loginRules } from './passport.rules.js'

// Utils and services
import { UsersService } from '../services/users.service.js'
const usersService = new UsersService()

// Strategies name
const registerStrategyName = 'register'
const loginStrategyName = 'login'
const githubStrategyName = 'github'

// Strategies options
const registerOptions = { failureRedirect: '/api/session/failedRegister', failureMessage: true  }
const loginOptions = { failureRedirect: '/api/session/failedLogin', failureMessage: true }

// Strategies Middlewares
const registerStrategy = passport.authenticate(registerStrategyName, registerOptions)
const loginStrategy = passport.authenticate(loginStrategyName, loginOptions)
const githubStrategy = passport.authenticate(githubStrategyName)

// Strategies configuration
const registerConfig = { passReqToCallback: true, usernameField: 'email' }
const loginConfig = { usernameField: 'email' }
const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
}

// Passport initialization
const initializePassport = () => {
  const localStrategy = local.Strategy
  passport.use(registerStrategyName, new localStrategy(registerConfig, registerRules))
  passport.use(loginStrategyName, new localStrategy(loginConfig, loginRules))
  passport.use(githubStrategyName, new GithubStrategy(githubConfig, githubRules))

  passport.serializeUser(function (user, done) {
    return done(null, user.id)
  })
  passport.deserializeUser(async function (id, done) {
    const user = await usersService.getUserBy({ _id: id })
    return done(null, user)
  })
}

export {initializePassport, registerStrategy, loginStrategy, githubStrategy}