import { createHash, validatePassword } from '../../utils/crypto.utils.js'
import { decodeToken, generateToken } from '../../utils/jwt.utils.js'
import { DTOs } from '../dto/dtos.js'
import { Services } from '../services/services.js'

const usersService = Services.users
const ms = Services.mailing
export class SessionController {
  registerUser = async (req, res) => {
    res.sendSuccess()
  }

  loginUser = async (req, res) => {
    if (!req.user) return res.sendUnauthorized()

    const user = {
      name: req.user.name,
      role: req.user.role,
      email: req.user.email,
      cart: req.user.cart
    } // req.user viene dado por passport

    const accessToken = generateToken(user)
    const cookieExpirationTime = process.env.JWT_COOKIE_EXP_TIME_MS
    const cookieName = process.env.JWT_COOKIE_NAME
    res
      .cookie(cookieName, accessToken, {
        maxAge: cookieExpirationTime,
        httpOnly: true
      })
      .sendSuccess()
  }

  githubAuthCallback = async (req, res) => {
    const user = {
      name: req.user.name,
      role: req.user.role,
      email: req.user.email,
      cart: req.user.cart
    }

    const accessToken = generateToken(user)
    const cookieExpirationTime = process.env.JWT_COOKIE_EXP_TIME_MS
    const cookieName = process.env.JWT_COOKIE_NAME
    res
      .cookie(cookieName, accessToken, {
        maxAge: cookieExpirationTime,
        httpOnly: true
      })
      .redirect('/products')
  }

  endSession = async (req, res) => {
    const cookieName = process.env.JWT_COOKIE_NAME
    res.clearCookie(cookieName).redirect('/login')
  }

  sendPasswordReset = async (req, res) => {
    try {
      const { email } = req.body

      const dbUser = await usersService.getUserBy({ email })
      if (!dbUser) return res.sendBadRequest({ message: 'The requested user does not exist' })
      const user = DTOs.user(dbUser).emailOnly
      const token = generateToken(user, '10m')

      await ms.sendEmail(ms.templates.RESTORE_PASSWORD, { recipient: email, token })

      res.sendSuccess()
    } catch (error) {
      res.sendInternalServerError({ message: error })
    }
  }

  restorePassword = async (req, res) => {
    const { token, password } = req.body
    const decodedToken = decodeToken(token)

    if (!decodedToken)
      return res.sendBadRequest({
        message: 'This request has expired. Please request a password reset again.'
      })

    const email = decodedToken.email
    const user = await usersService.getUserBy({ email })
    const isSamePassword = await validatePassword(password, user.password)
    if (isSamePassword)
      return res.sendBadRequest({ message: 'Your password must be different from the current one' })

    const encryptedPassword = await createHash(password)
    await usersService.updateUserBy({ email }, { password: encryptedPassword })

    await ms.sendEmail(ms.templates.PASSWORD_CHANGED, { recipient: email})
    res.sendSuccess()
  }
}
