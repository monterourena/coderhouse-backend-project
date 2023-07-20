import jwt from 'jsonwebtoken'

export default function middleware (policies) {
    const PUBLIC_POLICY = 'PUBLIC'

    return (req, res, next) => {
      if(policies[0]=== PUBLIC_POLICY) return next()

      const authHeaders = req.headers.authorization
      
      if(!authHeaders) return res.sendUnauthorized()
      
      const token = authHeaders.split(" ")[1]
      const user = jwt.verify(token, process.env.JWT_SECRET) 

      if(!policies.includes(user.role.toUpperCase())) {
        return res.sendForbidden()
      }

      req.user = user
      next()
    }
  }