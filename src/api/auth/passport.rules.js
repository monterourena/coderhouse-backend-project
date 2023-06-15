import { UsersService } from '../services/users.service.js'
import { createHash, validatePassword } from '../../utils/crypto.utils.js'

const usersService = new UsersService()

const PROVIDERS = { LOCAL: 'local', GITHUB: 'github' }
const ROLES = { USER: 'user', ADMIN: 'admin' }

const registerRules = async (req, email, password, done) => {
  try {
    const { first_name, last_name, role } = req.body
    const exists = await usersService.getUserBy({ email })
    if (exists) return done(null, false, { message: 'User already exists' })

    const hashedPassword = await createHash(password)
    const user = {
      first_name,
      last_name,
      role,
      email,
      password: hashedPassword,
      provider: PROVIDERS.LOCAL,
    }
    const result = await usersService.createUser(user)

    done(null, result)
  } catch (error) {
    done(error)
  }
}

const loginRules = async (email, password, done) => {
  try {
    let user = await usersService.getUserBy({ email })
    if (!user) return done(null, false, { message: 'User does not exist' })

    const isValidPassword = await validatePassword(password, user.password)

    if (!isValidPassword) return done(null, false, { message: 'Invalid password' })

    user = {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role,
    }

    done(null, user)
  } catch (error) {
    done(error)
  }
}

const githubRules = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile?.emails[0].value
    const { name } = profile._json

    const user = await usersService.getUserBy({ email })

    if (!email) return done(null, false, { message: 'Unable to get an email linked to this account' })

    if (!user) {
      const response = await usersService.createUser({
        email,
        first_name: name,
        last_name: '',
        password: '',
        role: ROLES.USER,
        provider: PROVIDERS.GITHUB,
      })

      return done(null, response)
    }

    done(null, user)
  } catch (error) {
    done(error)
  }
}

export { githubRules, loginRules, registerRules }
