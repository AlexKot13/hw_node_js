import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const JWT_SECRET = process.env.SECRET_KEY_JWT

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({message: 'Token is missing'})
  }


const token = authHeader.split(' ') [1]

jwt.verify(token, JWT_SECRET, (err, user) => {
  if (err) return res.status(403).json({message: "Invalid token"})

   req.user = user
   next()
 })
}