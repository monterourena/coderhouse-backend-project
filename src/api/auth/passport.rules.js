import { AUTH } from '../../constants/constants.js'
import { createHash, validatePassword } from '../../utils/crypto.utils.js'
import { DTOs } from '../dto/dtos.js'
import { Services } from '../services/services.js'

const usersService = Services.users
const cartsService = Services.carts

const ROLES = AUTH.ROLES
const PROVIDERS = AUTH.PROVIDERS

const registerRules = async (req, email, password, done) => {
  try {
    const { first_name, last_name } = req.body


    const exists = await usersService.getUserBy({ email })
    if (exists) return done(null, false, { message: 'User already exists' })

    // Aquí se crea el nuevo cart y se agrega al usuario
    const cart = await cartsService.createCart()
    const hashedPassword = await createHash(password)
    const user = {
      first_name,
      last_name,
      role: ROLES.USER,
      email,
      password: hashedPassword,
      provider: PROVIDERS.LOCAL,
      cart: cart
    }
    const result = await usersService.createUser(user)
    const newUser = DTOs.user(result).passportNewUser

    done(null, newUser)
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

    const parsedUser = DTOs.user(user).passportNewUser

    done(null, parsedUser)
  } catch (error) {
    done(error)
  }
}

const githubRules = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile?.emails[0].value
    const { name } = profile._json || ''
    let user = await usersService.getUserBy({ email })


    if (!email) return done(null, false, { message: 'Unable to get an email linked to this account' })

    // Aquí se hace el nuevo cart y se le envía al usuario

    if (!user) {
      const cart = await cartsService.createCart()
      const response = await usersService.createUser({
        email,
        first_name: name,
        last_name: '',
        password: '',
        role: ROLES.USER,
        provider: PROVIDERS.GITHUB,
        cart: cart._id
      })

    
      const githubUser = DTOs.user(response).passportNewUser

      return done(null, githubUser)
    }

    const parsedUser = DTOs.user(user).passportNewUser
    
    done(null, parsedUser)
  } catch (error) {
    done(error)
  }
}

const jwtRules = async (payload, done) => {
  return done(null, payload)
}

export { githubRules, loginRules, registerRules, jwtRules }
