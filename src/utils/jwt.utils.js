import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  const EXP_TIME = process.env.JWT_EXP_TIME
  const token = jwt.sign(user , process.env.JWT_SECRET, { expiresIn: EXP_TIME })
  return token
}

const isValidToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return true
  } catch (error) {
    return false
  }
}

export const decodeToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    return data
  } catch (error) {
    return null
  }
}

export const jwtCookieExtractor = (req) => {
  if (!req || !req.cookies) return null
  const token = req.cookies[process.env.JWT_COOKIE_NAME]
  if (!isValidToken(token)) return null
  return token
}
