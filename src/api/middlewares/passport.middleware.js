import passport from "passport"

export const passportCall = (strategyName) => {
  return async (req, res, next) => {
    passport.authenticate(strategyName, (error, user, info) => {
      const message = info ? info?.message : info?.toString()
      if (error) return next(error)
      req.user = user
      req.message = message
      next()
    })(req, res, next)
  }
}